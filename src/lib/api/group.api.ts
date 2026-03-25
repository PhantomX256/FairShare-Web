import api from "./axios.config.ts";
import { GROUP_MEMBER_URL, GROUPS_URL } from "../constants/api.constants.ts";
import type {
	CreateGroupForm,
	EditGroupRequest,
	Group,
	GroupData,
} from "../types/types.ts";

export async function getAllGroups(): Promise<Group[]> {
	const { data } = await api.get(GROUPS_URL);
	return data.groups;
}

export async function createGroup(createGroupForm: CreateGroupForm) {
	const payload = {
		...createGroupForm,
		users: createGroupForm.users.map((user) => user.internal_id),
	};

	await api.post(GROUPS_URL, { createGroupForm: payload });
}

export async function getGroupData(groupId: string): Promise<GroupData> {
	const { data } = await api.get(`${GROUPS_URL}/${groupId}`);
	return data;
}

export async function editGuestName({
	memberId,
	name,
}: {
	memberId: number;
	name: string;
}) {
	await api.put(GROUP_MEMBER_URL, { memberId, name });
}

export async function editGroup(editGroupRequest: EditGroupRequest) {
	await api.put(GROUPS_URL, { editGroupRequest });
}
