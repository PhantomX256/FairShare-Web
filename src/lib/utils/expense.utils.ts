import { MONEY_SCALE } from "../constants/constants.ts";
import type {
	AddExpenseRequest,
	ExpenseData,
	ExpenseForm,
	InvolvedMember,
	Member,
	Payer,
	SplitMode,
} from "../types/types.ts";
import { AddExpenseFormSchema } from "../validators/expense.validator.ts";
import { AppError } from "../errors/app.error.ts";

export class Milli {
	static toMilli(amount: number | string) {
		if (typeof amount === "string") amount = parseFloat(amount);
		return Math.round(amount * MONEY_SCALE);
	}

	static fromMilli(milli: number) {
		return milli / MONEY_SCALE;
	}

	static formatMilli(milli: number) {
		return (milli / MONEY_SCALE).toFixed(2);
	}

	static commaSeparatedFormat(milli: number) {
		return new Intl.NumberFormat("en-US", {
			maximumFractionDigits: 2,
		}).format(milli / MONEY_SCALE);
	}
}

export function changeAmountAndRecalculateSplits(
	previousExpenseForm: ExpenseForm,
	amount: number,
	amountString: string,
): ExpenseForm {
	return {
		...previousExpenseForm,
		amount,
		amountString,
		// If there aren't multiple payers then set the amount paid
		// by the payer to the changed amount
		paidBy: !previousExpenseForm.areMultiplePayers
			? [
					{
						...previousExpenseForm.paidBy[0],
						paidAmount: amount,
						paidAmountString: amountString,
					},
				]
			: previousExpenseForm.paidBy,
		membersInvolved: getSplits(
			previousExpenseForm.splitMode,
			previousExpenseForm.membersInvolved,
			amount,
		),
	};
}

export function getSplits(
	splitMode: SplitMode,
	membersInvolved: InvolvedMember[],
	amount: number,
	totalParts: number = membersInvolved.length,
) {
	if (splitMode === "equally")
		return recalculateEqualSplits(amount, membersInvolved);

	if (splitMode === "parts")
		return recalculatePartSplits(amount, membersInvolved, totalParts);

	return membersInvolved;
}

export function recalculateEqualSplits(
	amount: number,
	membersInvolved: InvolvedMember[],
): InvolvedMember[] {
	const newOwedAmount =
		membersInvolved.length > 0
			? Math.round(amount / membersInvolved.length)
			: 0;

	let delta =
		membersInvolved.length > 0
			? newOwedAmount * membersInvolved.length - amount
			: 0;

	return membersInvolved.map((member) => {
		const { newDelta, adjustedAmount } = getDeltaAdjustedAmount(
			delta,
			newOwedAmount,
		);
		delta = newDelta;

		return {
			...member,
			owedAmount: adjustedAmount,
			owedAmountString: Milli.formatMilli(adjustedAmount),
			parts: 1,
		};
	});
}

export function recalculatePartSplits(
	amount: number,
	membersInvolved: InvolvedMember[],
	totalParts: number,
): InvolvedMember[] {
	const newOwedAmountParts =
		totalParts > 0 ? Math.round(amount / totalParts) : 0;

	let delta = totalParts > 0 ? newOwedAmountParts * totalParts - amount : 0;

	return membersInvolved.map((member) => {
		const newOwedAmount = newOwedAmountParts * member.parts;
		const { newDelta, adjustedAmount } = getDeltaAdjustedAmount(
			delta,
			newOwedAmount,
		);
		delta = newDelta;

		return {
			...member,
			owedAmount: adjustedAmount,
			owedAmountString: Milli.formatMilli(adjustedAmount),
		};
	});
}

export function getDeltaAdjustedAmount(delta: number, amount: number) {
	if (delta > 0) return { newDelta: --delta, adjustedAmount: amount - 1 };
	if (delta < 0) return { newDelta: ++delta, adjustedAmount: amount + 1 };
	return { newDelta: delta, adjustedAmount: amount };
}

export function changeAmountAndResetSplits(
	previousExpenseForm: ExpenseForm,
): ExpenseForm {
	return {
		...previousExpenseForm,
		amount: 0.0,
		amountString: "",
		// If there are multiple payers then don't change anything
		// If there is only one payer then reset their paidAmount
		paidBy: !previousExpenseForm.areMultiplePayers
			? [
					{
						...previousExpenseForm.paidBy[0],
						paidAmount: 0.0,
						paidAmountString: "",
					},
				]
			: previousExpenseForm.paidBy,
		membersInvolved:
			// In case splitMode is specific don't change anything
			// In other cases reset the owedAmounts
			previousExpenseForm.splitMode !== "specific"
				? [
						...previousExpenseForm.membersInvolved.map(
							(memberInvolved) => ({
								...memberInvolved,
								owedAmount: 0.0,
								owedAmountString: "",
							}),
						),
					]
				: previousExpenseForm.membersInvolved,
	};
}

export function changePaymentModeAndResetSplits(
	previousExpenseForm: ExpenseForm,
	areMultiplePayers: boolean,
	currentUserMemberId: number,
): ExpenseForm {
	return {
		...previousExpenseForm,
		areMultiplePayers: areMultiplePayers,
		paidBy: [
			{
				// If there were multiple payers selected then default to current user
				// else retain the selected member
				memberId:
					previousExpenseForm.paidBy.length !== 1
						? currentUserMemberId
						: previousExpenseForm.paidBy[0].memberId,
				paidAmount: previousExpenseForm.amount,
				paidAmountString: previousExpenseForm.amountString,
			},
		],
	};
}

export function removePayer(
	previousExpenseForm: ExpenseForm,
	memberId: number,
): ExpenseForm {
	return {
		...previousExpenseForm,
		paidBy: [
			...previousExpenseForm.paidBy.filter(
				(payer) => payer.memberId !== memberId,
			),
		],
	};
}

export function changePaidAmount(
	previousExpenseForm: ExpenseForm,
	memberId: number,
	paidAmount: number,
	paidAmountString: string,
): ExpenseForm {
	return {
		...previousExpenseForm,
		paidBy: [
			...previousExpenseForm.paidBy.filter(
				(payer) => payer.memberId !== memberId,
			),
			{
				memberId,
				paidAmountString,
				paidAmount,
			},
		],
	};
}

export function removeInvolvement(
	previousExpenseForm: ExpenseForm,
	memberId: number,
): ExpenseForm {
	const newMembersInvolved = previousExpenseForm.membersInvolved.filter(
		(memberInvolved) => memberInvolved.memberId !== memberId,
	);

	return {
		...previousExpenseForm,
		membersInvolved: recalculateEqualSplits(
			previousExpenseForm.amount,
			newMembersInvolved,
		),
	};
}

export function addInvolvement(
	previousExpenseForm: ExpenseForm,
	memberId: number,
): ExpenseForm {
	const newMembersInvolved = [
		...previousExpenseForm.membersInvolved,
		{ memberId: memberId, owedAmount: 0, owedAmountString: "", parts: 1 },
	];

	return {
		...previousExpenseForm,
		membersInvolved: recalculateEqualSplits(
			previousExpenseForm.amount,
			newMembersInvolved,
		),
	};
}

export function incrementPart(
	membersInvolved: InvolvedMember[],
	amount: number,
	memberId: number,
	totalParts: number,
): InvolvedMember[] {
	const newOwedAmountParts = Math.round(amount / (totalParts + 1));
	let delta = newOwedAmountParts * (totalParts + 1) - amount;

	return membersInvolved.map((memberInvolved) => {
		const isSelectedMember = memberInvolved.memberId === memberId;

		const newOwedAmount = isSelectedMember
			? newOwedAmountParts * (memberInvolved.parts + 1)
			: newOwedAmountParts * memberInvolved.parts;

		const { newDelta, adjustedAmount } = getDeltaAdjustedAmount(
			delta,
			newOwedAmount,
		);
		delta = newDelta;

		return {
			...memberInvolved,
			owedAmount: adjustedAmount,
			owedAmountString: Milli.formatMilli(adjustedAmount),
			parts: isSelectedMember
				? memberInvolved.parts + 1
				: memberInvolved.parts,
		};
	});
}

export function involveMemberAndRecalculatePartSplits(
	membersInvolved: InvolvedMember[],
	amount: number,
	memberId: number,
	totalParts: number,
) {
	const newMembersInvolved = [
		...membersInvolved,
		{ memberId, owedAmount: 0, owedAmountString: "", parts: 1 },
	];

	return recalculatePartSplits(amount, newMembersInvolved, totalParts + 1);
}

export function decrementPart(
	membersInvolved: InvolvedMember[],
	amount: number,
	memberId: number,
	totalParts: number,
): InvolvedMember[] {
	let shouldMemberBeRemoved = false;

	const newOwedAmountParts = Math.round(amount / (totalParts - 1));
	let delta = newOwedAmountParts * (totalParts - 1) - amount;

	const updatedMembersInvolved = membersInvolved.map((memberInvolved) => {
		if (memberInvolved.memberId === memberId) {
			// If decreasing their part gives 0 then mark them for removal
			if (memberInvolved.parts - 1 === 0) {
				shouldMemberBeRemoved = true;
				return memberInvolved;
			}

			const newOwedAmount =
				newOwedAmountParts * (memberInvolved.parts - 1);
			const { newDelta, adjustedAmount } = getDeltaAdjustedAmount(
				delta,
				newOwedAmount,
			);
			delta = newDelta;

			return {
				...memberInvolved,
				parts: memberInvolved.parts - 1,
				owedAmount: adjustedAmount,
				owedAmountString: Milli.formatMilli(adjustedAmount),
			};
		} else {
			const newOwedAmount = newOwedAmountParts * memberInvolved.parts;
			const { newDelta, adjustedAmount } = getDeltaAdjustedAmount(
				delta,
				newOwedAmount,
			);
			delta = newDelta;

			return {
				...memberInvolved,
				owedAmount: adjustedAmount,
				owedAmountString: Milli.formatMilli(adjustedAmount),
			};
		}
	});

	// If the member must be removed then remove them else return normal
	return shouldMemberBeRemoved
		? updatedMembersInvolved.filter(
				(membersInvolved) => membersInvolved.memberId !== memberId,
			)
		: updatedMembersInvolved;
}

export function deleteInvolvement(
	previousExpenseForm: ExpenseForm,
	memberId: number,
): ExpenseForm {
	return {
		...previousExpenseForm,
		membersInvolved: previousExpenseForm.membersInvolved.filter(
			(m) => m.memberId !== memberId,
		),
	};
}

export function updateOwedAmount(
	previousExpenseForm: ExpenseForm,
	memberId: number,
	owedAmount: number,
	owedAmountString: string,
): ExpenseForm {
	return {
		...previousExpenseForm,
		membersInvolved: [
			...previousExpenseForm.membersInvolved.filter(
				(m) => m.memberId !== memberId,
			),
			{ memberId, owedAmount, owedAmountString, parts: 1 },
		],
	};
}

export function addAll(
	previousExpenseForm: ExpenseForm,
	members: Member[],
): ExpenseForm {
	const newMembersInvolved = members.map(
		(m): InvolvedMember => ({
			memberId: m.member_id,
			owedAmount: 0,
			owedAmountString: "",
			parts: 1,
		}),
	);

	return {
		...previousExpenseForm,
		membersInvolved: getSplits(
			previousExpenseForm.splitMode,
			newMembersInvolved,
			previousExpenseForm.amount,
		),
	};
}

export function sanitiseForm(ExpenseForm: ExpenseForm): ExpenseForm {
	return {
		...ExpenseForm,
		title: ExpenseForm.title.trim(),
		paidBy: ExpenseForm.paidBy.filter((p) => p.paidAmount !== 0),
		membersInvolved: ExpenseForm.membersInvolved.filter(
			(m) => m.owedAmount !== 0 || m.parts !== 0,
		),
	};
}

export function validateAddExpenseForm(
	ExpenseForm: ExpenseForm,
): AddExpenseRequest {
	const addExpenseFormZod: AddExpenseRequest = {
		...AddExpenseFormSchema.parse(ExpenseForm),
		isTransaction: false,
	};

	if (
		addExpenseFormZod.paidBy.length === 1 &&
		addExpenseFormZod.membersInvolved.length === 1 &&
		addExpenseFormZod.paidBy[0].memberId ===
			addExpenseFormZod.membersInvolved[0].memberId
	)
		throw new AppError(
			"The only 2 people involved are paying and involved",
		);

	return addExpenseFormZod;
}

export function displaySplitMode(splitMode: SplitMode) {
	if (splitMode === "equally") return "Equal Splits";
	if (splitMode === "parts") return "Split by Parts";
	return "Specific Splits";
}

export function getCommaSeparated(amount: string | number) {
	if (typeof amount === "string") amount = parseFloat(amount);

	return new Intl.NumberFormat("en-US", {
		maximumFractionDigits: 2,
	}).format(amount);
}

export function getDefaultExpenseForm(
	members: Member[],
	currentUserMemberId: number,
): ExpenseForm {
	return {
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
	};
}

export function getExpenseFormDataFromExpenseData(
	expenseData: ExpenseData,
): ExpenseForm {
	let numberPayers = 0;

	const paidBy: Payer[] = [];
	const membersInvolved: InvolvedMember[] = [];

	for (const expenseMember of expenseData.expenseMembers) {
		if (expenseMember.paid_amount > 0) {
			numberPayers++;
			paidBy.push({
				memberId: expenseMember.member_id,
				paidAmount: expenseMember.paid_amount,
				paidAmountString: Milli.formatMilli(expenseMember.paid_amount),
			});
		}

		if (expenseMember.owed_amount > 0) {
			membersInvolved.push({
				memberId: expenseMember.member_id,
				owedAmount: expenseMember.owed_amount,
				owedAmountString: Milli.formatMilli(expenseMember.owed_amount),
				parts: expenseMember.parts,
			});
		}
	}

	return {
		title: expenseData.expense.title,
		icon: expenseData.expense.icon,
		amount: expenseData.expense.amount,
		amountString: Milli.formatMilli(expenseData.expense.amount),
		areMultiplePayers: numberPayers > 1,
		splitMode: expenseData.expense.split_mode ?? "equally",
		paidBy,
		membersInvolved,
	};
}
