import api from "./axios.config.ts";
import { BALANCE_URL } from "../constants/api.constants.ts";
import type { Balance } from "../types/types.ts";

export async function getGroupBalances(groupId: string): Promise<Balance[]> {
	const { data } = await api.get(BALANCE_URL, {
		params: {
			groupId,
		},
	});
	return data.balances;
}
