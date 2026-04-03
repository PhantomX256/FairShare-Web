import { useMemo, useState } from "react";
import { useAuth } from "./context.hooks.ts";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import type { GroupData } from "../types/types.ts";
import { ExpenseAmount } from "../validators/expense.validator.ts";

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

	const [form, setForm] = useState({
		title: "",
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

	function changeAmount(amountString: string) {
		try {
			const amount = ExpenseAmount.parse(amountString);
			setForm((prev) => ({
				...prev,
				amount,
				amountString,
				// If there aren't multiple payers then set the amount paid
				// by the payer to the changed amount
				paidBy: !prev.areMultiplePayers
					? [
							{
								...prev.paidBy[0],
								paidAmount: amount,
								paidAmountString: amountString,
							},
						]
					: prev.paidBy,
				membersInvolved: getSplits(
					prev.splitMode,
					prev.membersInvolved,
					amount,
				),
			}));
		} catch {
			// This usually happens when the amount field is empty or 0 in which case we reset all fields
			setForm((prev) => ({
				...prev,
				amount: 0.0,
				amountString: "",
				paidBy: !prev.areMultiplePayers
					? [
							{
								...prev.paidBy[0],
								paidAmount: 0.0,
								paidAmountString: "",
							},
						]
					: prev.paidBy,
				membersInvolved:
					prev.splitMode !== "specific"
						? [
								...prev.membersInvolved.map(
									(memberInvolved) => ({
										...memberInvolved,
										owedAmount: 0.0,
										owedAmountString: "",
									}),
								),
							]
						: prev.membersInvolved,
			}));
		}
	}

	function getSplits(
		splitMode: string,
		membersInvolved: {
			memberId: number;
			owedAmount: number;
			owedAmountString: string;
			parts: number;
		}[],
		amount?: number,
	) {
		amount = amount ? amount : form.amount;
		if (splitMode === "equally") {
			const newOwedAmount = amount / membersInvolved.length;

			return membersInvolved.map((member) => ({
				...member,
				owedAmount: newOwedAmount,
				owedAmountString: newOwedAmount.toFixed(3),
				parts: 1,
			}));
		}
		if (splitMode === "parts") {
			return membersInvolved.map((member) => {
				const newOwedAmount = (amount / totalParts) * member.parts;

				return {
					...member,
					owedAmount: newOwedAmount,
					owedAmountString: newOwedAmount.toFixed(3),
				};
			});
		}
		return membersInvolved;
	}

	function changeNumberOfPayers(areMultiplePayers: boolean) {
		// If the form is already toggled then don't change anything
		if (form.areMultiplePayers === areMultiplePayers) return;

		// If we are disabling multiple payers and there are more than one payer selected
		// then default to single payer and set that to current user
		if (!areMultiplePayers) {
			setForm((prev) => ({
				...prev,
				areMultiplePayers: areMultiplePayers,
				paidBy: [
					{
						// If there were multiple payers selected then default to current user
						// else retain the selected member
						memberId:
							prev.paidBy.length !== 1
								? currentUserMemberId
								: prev.paidBy[0].memberId,
						paidAmount: prev.amount,
						paidAmountString: prev.amountString,
					},
				],
			}));
			// Else we just switch modes and not tamper with paidBy
		} else {
			setForm((prev) => ({
				...prev,
				areMultiplePayers: areMultiplePayers,
			}));
		}
	}

	function changeSplitMode(splitMode: string) {
		if (form.splitMode === splitMode) return;
		setForm((prev) => ({
			...prev,
			splitMode,
			membersInvolved: getSplits(splitMode, prev.membersInvolved),
		}));
	}

	function changePayer(memberId: number) {
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
		if (!form.areMultiplePayers) return;

		// If the string is blank then remove that user
		if (paidAmountString === "") {
			setForm((prev) => ({
				...prev,
				paidBy: [
					...prev.paidBy.filter(
						(payer) => payer.memberId !== memberId,
					),
				],
			}));
		}

		try {
			const paidAmount = ExpenseAmount.parse(paidAmountString);
			setForm((prev) => ({
				...prev,
				paidBy: [
					...prev.paidBy.filter(
						(payer) => payer.memberId !== memberId,
					),
					{
						memberId,
						paidAmountString,
						paidAmount,
					},
				],
			}));
		} catch {
			return;
		}
	}

	function changeInvolvement(memberId: number) {
		if (
			form.membersInvolved.some(
				(memberInvolved) => memberInvolved.memberId === memberId,
			)
		) {
			setForm((prev) => {
				const newMembersInvolved = prev.membersInvolved.filter(
					(memberInvolved) => memberInvolved.memberId !== memberId,
				);

				const newOwedAmount =
					newMembersInvolved.length > 0
						? prev.amount / newMembersInvolved.length
						: 0;

				return {
					...prev,
					membersInvolved: newMembersInvolved.map(
						(memberInvolved) => ({
							...memberInvolved,
							owedAmount: newOwedAmount,
							owedAmountString: newOwedAmount.toFixed(3),
						}),
					),
				};
			});
		} else {
			setForm((prev) => {
				const newOwedAmount =
					prev.amount / (prev.membersInvolved.length + 1);

				const newMembersInvolved = [
					...prev.membersInvolved.map((memberInvolved) => ({
						...memberInvolved,
						owedAmount: newOwedAmount,
					})),
					{
						memberId,
						owedAmount: newOwedAmount,
						owedAmountString: newOwedAmount.toFixed(3),
						parts: 1,
					},
				];

				return {
					...prev,
					membersInvolved: newMembersInvolved,
				};
			});
		}
	}

	return {
		form,
		remainingBalance,
		changeTitle,
		changeAmount,
		isPayerSelected,
		isMemberInvolved,
		changeNumberOfPayers,
		changeSplitMode,
		changePayer,
		changePayerAmount,
		changeInvolvement,
	};
}
