import { z } from "zod";
import { EXPENSE_ICONS } from "../constants/constants.ts";

export const ExpenseTitle = z.string().min(1);

export const ExpenseAmount = z
	.string()
	.min(1)
	.transform((val) => z.number().gte(0).parse(parseFloat(val)));

export const AddExpenseFormSchema = z.object({
	groupId: z.uuid("Invalid Group"),
	title: z.string().min(1, "Invalid Title"),
	icon: z.enum(EXPENSE_ICONS, "Invalid Icon"),
	amount: z.number().gt(0, "Invalid Amount"),
	paidBy: z
		.array(
			z.object({
				memberId: z.number().gt(0, "Invalid Member"),
				paidAmount: z.number().gt(0, "Invalid Paid Amount"),
			}),
		)
		.min(1, "Number of Payers cannot be 0"),
	splitMode: z.enum(["equally", "parts", "specific"]),
	membersInvolved: z
		.array(
			z.object({
				memberId: z.number().gt(0, "Invalid Member"),
				owedAmount: z.number().gt(0, "Invalid Owed Amount"),
			}),
		)
		.min(1, "Number of Members Involved should not be 0"),
});
