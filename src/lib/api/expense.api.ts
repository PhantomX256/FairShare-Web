import type { AddExpenseForm, Expense, ExpenseData } from "../types/types.ts";
import { validateAddExpenseForm } from "../utils/expense.utils.ts";
import api from "./axios.config.ts";
import { EXPENSE_URL } from "../constants/api.constants.ts";

export async function getExpenses(groupId: string): Promise<Expense[]> {
	const { data } = await api.get(EXPENSE_URL, {
		params: { groupId },
	});
	return data.expenses;
}

export async function addExpense(addExpenseForm: AddExpenseForm) {
	const addExpenseRequest = validateAddExpenseForm(addExpenseForm);
	await api.post(EXPENSE_URL, { addExpenseRequest });
}

export async function getExpenseData(expenseId: string): Promise<ExpenseData> {
	const { data } = await api.get(`${EXPENSE_URL}/${expenseId}`);
	return data.expenseData;
}
