import type {
	EditGroupForm,
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
