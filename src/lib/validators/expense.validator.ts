import { z } from "zod";

export const ExpenseTitle = z.string().min(1);

export const ExpenseAmount = z.string().min(1).transform((val) => z.number().gte(0).parse(parseFloat(val)));