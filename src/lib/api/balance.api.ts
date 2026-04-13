import api from "./axios.config.ts";
import { BALANCE_URL } from "../constants/api.constants.ts";
import type { Balance, Transaction } from "../types/types.ts";

export async function getGroupBalances(
	groupId: string,
): Promise<{ balances: Balance[]; transactions: Transaction[] }> {
	const { data } = await api.get(BALANCE_URL, {
		params: {
			groupId,
		},
	});
	return data.groupBalances;
}
