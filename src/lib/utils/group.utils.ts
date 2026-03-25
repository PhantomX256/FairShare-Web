import type {
	EditGroupForm,
	EditGroupRequest,
	GroupData,
	Guest,
	Member,
} from "../types/types.ts";

export function createStateForEditGroup(groupData: GroupData): EditGroupForm {
	const { users, guests } = segregateUsersAndGuests(groupData.members);

	return {
		groupInternalId: groupData.group.internal_id,
		name: groupData.group.name,
		icon: groupData.group.icon,
		color: groupData.group.color,
		users,
		guests,
		newUsers: [],
		newGuests: [],
		removeMembers: [],
	};
}

function segregateUsersAndGuests(members: Member[]) {
	return members.reduce<{
		users: Member[];
		guests: Guest[];
	}>(
		(acc, member) => {
			if (member.internal_id != null) acc.users.push(member);
			else
				acc.guests.push({
					member_id: member.member_id,
					name: member.name,
					isOriginalMember: true,
				});
			return acc;
		},
		{ users: [], guests: [] },
	);
}

export function getChangedFields(
	editGroupForm: EditGroupForm,
	groupData: GroupData,
): { editGroupRequest: EditGroupRequest | null; areFieldsDifferent: boolean } {
	const { group } = groupData;

	const editGroupRequest: EditGroupRequest = {
		groupId: group.id,
		name:
			editGroupForm.name !== group.name ? editGroupForm.name : undefined,
		icon:
			editGroupForm.icon !== group.icon ? editGroupForm.icon : undefined,
		color:
			editGroupForm.color !== group.color
				? editGroupForm.color
				: undefined,
		newUsers: editGroupForm.newUsers.map((user) => user.internal_id),
		newGuests: editGroupForm.newGuests,
		removeMembers: editGroupForm.removeMembers.map(
			(member) => member.member_id,
		),
	};

	return {
		editGroupRequest: editGroupRequest,
		areFieldsDifferent:
			!!editGroupRequest.name ||
			!!editGroupRequest.icon ||
			!!editGroupRequest.color ||
			editGroupRequest.newGuests.length !== 0 ||
			editGroupRequest.newUsers.length !== 0 ||
			editGroupRequest.removeMembers.length !== 0,
	};
}
