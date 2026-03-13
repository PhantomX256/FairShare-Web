import api from "./axios.config.ts";
import { GET_GROUPS_URL } from "../constants/api.constants.ts";
import type { Group } from "../types/types.ts";

export async function getAllGroups(): Promise<Group[]> {
	const { data } = await api.get(GET_GROUPS_URL);
	return data.groups;
}