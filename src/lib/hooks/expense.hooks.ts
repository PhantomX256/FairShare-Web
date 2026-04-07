import { useMemo, useState } from "react";
import { useAuth, usePopup } from "./context.hooks.ts";
import { useParams } from "react-router-dom";
import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import type { AddExpenseForm, GroupData, SplitMode } from "../types/types.ts";
import { ExpenseAmount } from "../validators/expense.validator.ts";
import {
	addInvolvement,
	changeAmountAndRecalculateSplits,
	changeAmountAndResetSplits,
	changePaidAmount,
	changePaymentModeAndResetSplits,
	decrementPart,
	deleteInvolvement,
	getSplits,
	incrementPart,
	involveMemberAndRecalculatePartSplits,
	Milli,
	removeInvolvement,
	removePayer,
	sanitiseForm,
	updateOwedAmount,
} from "../utils/expense.utils.ts";
import { toast } from "../../components/shared/CustomToast.tsx";
import { addExpense, getExpenses } from "../api/expense.api.ts";
import { ZodError } from "zod";
import { AppError } from "../errors/app.error.ts";
import { minutes } from "../utils/date.utils.ts";

// I realize this could be very retarded
// I could've very simply merged paidBy and membersInvolved
// But oh well it's too late now maybe a fix for a later date
export function useAddExpenseForm() {
	const { user } = useAuth();
	const { groupId } = useParams();
	const queryClient = useQueryClient();
	const { members } = queryClient.getQueryData<GroupData>([
		"group",
		groupId!,
	])!;
	const currentUserMemberId = members.find(
		(member) => member.internal_id === user!.internal_id,
	)!.member_id;
	const { mutateAsync: addExpense, isPending: isAdding } = useAddExpense();

	const [form, setForm] = useState<AddExpenseForm>({
		groupId: groupId!,
		title: "",
		icon: "payments",
		amount: 0.0,
		amountString: "",
		areMultiplePayers: false,
		paidBy: [
			{
				memberId: currentUserMemberId,
				paidAmount: 0.0,
				paidAmountString: "",
			},
		],
		splitMode: "equally",
		membersInvolved: members.map((member) => ({
			memberId: member.member_id,
			owedAmount: 0.0,
			owedAmountString: "",
			parts: 1,
		})),
	});

	const totalPaid = useMemo(
		() => form.paidBy.reduce((sum, payer) => sum + payer.paidAmount, 0),
		[form.paidBy],
	);

	const remainingBalance = useMemo(
		() => form.amount - totalPaid,
		[form.amount, totalPaid],
	);

	const totalParts = useMemo(
		() =>
			form.membersInvolved.reduce((sum, member) => sum + member.parts, 0),
		[form.membersInvolved],
	);

	const totalOwedAmount = useMemo(
		() => form.membersInvolved.reduce((sum, m) => sum + m.owedAmount, 0),
		[form.membersInvolved],
	);

	const remainingOwedBalance = useMemo(
		() => form.amount - totalOwedAmount,
		[form.amount, totalOwedAmount],
	);

	function isPayerSelected(memberId: number) {
		return form.paidBy.some((payer) => payer.memberId === memberId);
	}

	function isMemberInvolved(memberId: number) {
		return form.membersInvolved.some(
			(memberInvolved) => memberInvolved.memberId === memberId,
		);
	}

	function changeTitle(title: string) {
		setForm((prev) => ({ ...prev, title }));
	}

	function changeIcon(icon: string) {
		setForm((prev) => ({ ...prev, icon }));
	}

	function changeAmount(amountString: string) {
		try {
			// Parse the field to ensure the entered value is >= 0
			const amount = Milli.toMilli(ExpenseAmount.parse(amountString));
			setForm((prev) =>
				changeAmountAndRecalculateSplits(prev, amount, amountString),
			);
		} catch {
			// This usually happens when the amount field is empty or 0 in which case we reset all fields
			setForm((prev) => changeAmountAndResetSplits(prev));
		}
	}

	function changeNumberOfPayers(areMultiplePayers: boolean) {
		// If the form is already toggled then don't change anything
		if (form.areMultiplePayers === areMultiplePayers) return;

		// If we are disabling multiple payers and then we reset them
		if (!areMultiplePayers) {
			setForm((prev) =>
				changePaymentModeAndResetSplits(
					prev,
					areMultiplePayers,
					currentUserMemberId,
				),
			);
			// Else we just switch modes and not tamper with paidBy
		} else {
			setForm((prev) => ({
				...prev,
				areMultiplePayers: areMultiplePayers,
			}));
		}
	}

	function changeSplitMode(splitMode: SplitMode) {
		// If the split mode is already the same don't do shit
		if (form.splitMode === splitMode) return;

		// Get new splits according to split mode and assign
		setForm((prev) => ({
			...prev,
			splitMode,
			// If we are switching from equally to parts then don't calculate splits
			membersInvolved:
				prev.splitMode === "equally" && splitMode === "parts"
					? prev.membersInvolved
					: getSplits(splitMode, prev.membersInvolved, prev.amount),
		}));
	}

	function changePayer(memberId: number) {
		// If the member being switch to is the same then do nothing
		if (form.paidBy[0].memberId === memberId) return;
		setForm((prev) => ({
			...prev,
			paidBy: [
				{
					memberId: memberId,
					paidAmount: prev.amount,
					paidAmountString: prev.amountString,
				},
			],
		}));
	}

	function changePayerAmount(memberId: number, paidAmountString: string) {
		// If the form doesn't permit multiple payers then return
		if (!form.areMultiplePayers) return;

		// If the string is blank then remove that user
		if (paidAmountString === "") {
			setForm((prev) => removePayer(prev, memberId));
			return;
		}

		try {
			// Parse the paidAmountString to get the paidAmount
			const paidAmount = Milli.toMilli(
				ExpenseAmount.parse(paidAmountString),
			);
			return setForm((prev) =>
				changePaidAmount(prev, memberId, paidAmount, paidAmountString),
			);
		} catch {
			return;
		}
	}

	function changeInvolvement(memberId: number) {
		if (form.splitMode !== "equally") return;

		if (isMemberInvolved(memberId)) {
			setForm((prev) => removeInvolvement(prev, memberId));
		} else {
			setForm((prev) => addInvolvement(prev, memberId));
		}
	}

	function addPart(memberId: number) {
		if (form.splitMode !== "parts") return;

		setForm((prev) => {
			// If the member was involved then increase their share and recalculate splits
			// Else add them and recalculate splits
			const updatedMembersInvolved = isMemberInvolved(memberId)
				? incrementPart(
						prev.membersInvolved,
						prev.amount,
						memberId,
						totalParts,
					)
				: involveMemberAndRecalculatePartSplits(
						prev.membersInvolved,
						prev.amount,
						memberId,
						totalParts,
					);

			return {
				...prev,
				membersInvolved: updatedMembersInvolved,
			};
		});
	}

	function removePart(memberId: number) {
		if (form.splitMode !== "parts") return;

		setForm((prev) => {
			return {
				...prev,
				membersInvolved: decrementPart(
					prev.membersInvolved,
					prev.amount,
					memberId,
					totalParts,
				),
			};
		});
	}

	function changeOwedAmount(memberId: number, owedAmountString: string) {
		if (form.splitMode !== "specific") return;

		if (owedAmountString === "") {
			setForm((prev) => deleteInvolvement(prev, memberId));
			return;
		}

		try {
			const owedAmount = Milli.toMilli(
				ExpenseAmount.parse(owedAmountString),
			);
			setForm((prev) =>
				updateOwedAmount(prev, memberId, owedAmount, owedAmountString),
			);
		} catch {
			return;
		}
	}

	async function submitForm() {
		const sanitisedForm = sanitiseForm(form);
		if (remainingOwedBalance !== 0 || remainingBalance !== 0) {
			toast({
				message: "Please check if there is any remaining balance",
				success: false,
			});
			return;
		}

		await addExpense(sanitisedForm);
	}

	return {
		form,
		remainingBalance,
		changeTitle,
		changeIcon,
		changeAmount,
		isPayerSelected,
		isMemberInvolved,
		changeNumberOfPayers,
		changeSplitMode,
		changePayer,
		changePayerAmount,
		changeInvolvement,
		addPart,
		removePart,
		changeOwedAmount,
		remainingOwedBalance,
		submitForm,
		isAdding,
	};
}

export function useAddExpense() {
	const queryClient = useQueryClient();
	const { closeAddExpensePopup } = usePopup();

	return useMutation({
		mutationFn: addExpense,
		onError: (error) => {
			if (error instanceof ZodError) {
				return toast({
					message: error.issues[0].message,
					success: false,
				});
			}
			if (error instanceof AppError) {
				return toast({ message: error.message, success: false });
			}
			toast({
				message: "Something went wrong while adding expense",
				success: false,
			});
		},
		onSuccess: async (_, addExpenseForm) => {
			await queryClient.invalidateQueries({
				queryKey: ["group", addExpenseForm.groupId, "expenses"],
			});
			closeAddExpensePopup();
		},
	});
}

export function useGetExpenses(groupId: string) {
	return useQuery({
		queryKey: ["group", groupId, "expenses"],
		queryFn: () => getExpenses(groupId),
		refetchOnWindowFocus: false,
		staleTime: minutes(5),
		placeholderData: keepPreviousData,
	});
}
