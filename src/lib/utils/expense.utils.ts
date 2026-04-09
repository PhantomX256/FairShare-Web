import { MONEY_SCALE } from "../constants/constants.ts";
import type { AddExpenseForm, AddExpenseRequest, InvolvedMember, SplitMode } from "../types/types.ts";
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
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(milli / MONEY_SCALE);
	}
}

export function changeAmountAndRecalculateSplits(
	previousAddExpenseForm: AddExpenseForm,
	amount: number,
	amountString: string,
): AddExpenseForm {
	return {
		...previousAddExpenseForm,
		amount,
		amountString,
		// If there aren't multiple payers then set the amount paid
		// by the payer to the changed amount
		paidBy: !previousAddExpenseForm.areMultiplePayers
			? [
					{
						...previousAddExpenseForm.paidBy[0],
						paidAmount: amount,
						paidAmountString: amountString,
					},
				]
			: previousAddExpenseForm.paidBy,
		membersInvolved: getSplits(
			previousAddExpenseForm.splitMode,
			previousAddExpenseForm.membersInvolved,
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
	previousAddExpenseForm: AddExpenseForm,
): AddExpenseForm {
	return {
		...previousAddExpenseForm,
		amount: 0.0,
		amountString: "",
		// If there are multiple payers then don't change anything
		// If there is only one payer then reset their paidAmount
		paidBy: !previousAddExpenseForm.areMultiplePayers
			? [
					{
						...previousAddExpenseForm.paidBy[0],
						paidAmount: 0.0,
						paidAmountString: "",
					},
				]
			: previousAddExpenseForm.paidBy,
		membersInvolved:
			// In case splitMode is specific don't change anything
			// In other cases reset the owedAmounts
			previousAddExpenseForm.splitMode !== "specific"
				? [
						...previousAddExpenseForm.membersInvolved.map(
							(memberInvolved) => ({
								...memberInvolved,
								owedAmount: 0.0,
								owedAmountString: "",
							}),
						),
					]
				: previousAddExpenseForm.membersInvolved,
	};
}

export function changePaymentModeAndResetSplits(
	previousAddExpenseForm: AddExpenseForm,
	areMultiplePayers: boolean,
	currentUserMemberId: number,
): AddExpenseForm {
	return {
		...previousAddExpenseForm,
		areMultiplePayers: areMultiplePayers,
		paidBy: [
			{
				// If there were multiple payers selected then default to current user
				// else retain the selected member
				memberId:
					previousAddExpenseForm.paidBy.length !== 1
						? currentUserMemberId
						: previousAddExpenseForm.paidBy[0].memberId,
				paidAmount: previousAddExpenseForm.amount,
				paidAmountString: previousAddExpenseForm.amountString,
			},
		],
	};
}

export function removePayer(
	previousAddExpenseForm: AddExpenseForm,
	memberId: number,
): AddExpenseForm {
	return {
		...previousAddExpenseForm,
		paidBy: [
			...previousAddExpenseForm.paidBy.filter(
				(payer) => payer.memberId !== memberId,
			),
		],
	};
}

export function changePaidAmount(
	previousAddExpenseForm: AddExpenseForm,
	memberId: number,
	paidAmount: number,
	paidAmountString: string,
): AddExpenseForm {
	return {
		...previousAddExpenseForm,
		paidBy: [
			...previousAddExpenseForm.paidBy.filter(
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
	previousAddExpenseForm: AddExpenseForm,
	memberId: number,
): AddExpenseForm {
	const newMembersInvolved = previousAddExpenseForm.membersInvolved.filter(
		(memberInvolved) => memberInvolved.memberId !== memberId,
	);

	return {
		...previousAddExpenseForm,
		membersInvolved: recalculateEqualSplits(
			previousAddExpenseForm.amount,
			newMembersInvolved,
		),
	};
}

export function addInvolvement(
	previousAddExpenseForm: AddExpenseForm,
	memberId: number,
): AddExpenseForm {
	const newMembersInvolved = [
		...previousAddExpenseForm.membersInvolved,
		{ memberId: memberId, owedAmount: 0, owedAmountString: "", parts: 1 },
	];

	return {
		...previousAddExpenseForm,
		membersInvolved: recalculateEqualSplits(
			previousAddExpenseForm.amount,
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
	previousAddExpenseForm: AddExpenseForm,
	memberId: number,
): AddExpenseForm {
	return {
		...previousAddExpenseForm,
		membersInvolved: previousAddExpenseForm.membersInvolved.filter(
			(m) => m.memberId !== memberId,
		),
	};
}

export function updateOwedAmount(
	previousAddExpenseForm: AddExpenseForm,
	memberId: number,
	owedAmount: number,
	owedAmountString: string,
): AddExpenseForm {
	return {
		...previousAddExpenseForm,
		membersInvolved: [
			...previousAddExpenseForm.membersInvolved.filter(
				(m) => m.memberId !== memberId,
			),
			{ memberId, owedAmount, owedAmountString, parts: 1 },
		],
	};
}

export function sanitiseForm(addExpenseForm: AddExpenseForm): AddExpenseForm {
	return {
		...addExpenseForm,
		title: addExpenseForm.title.trim(),
		paidBy: addExpenseForm.paidBy.filter((p) => p.paidAmount !== 0),
		membersInvolved: addExpenseForm.membersInvolved.filter(
			(m) => m.owedAmount !== 0 || m.parts !== 0,
		),
	};
}

export function validateAddExpenseForm(
	addExpenseForm: AddExpenseForm,
): AddExpenseRequest {
	const addExpenseFormZod: AddExpenseRequest = {
		...AddExpenseFormSchema.parse(addExpenseForm),
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
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount);
}
