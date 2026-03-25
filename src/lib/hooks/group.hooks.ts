import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import {
	createGroup,
	editGroup,
	editGuestName,
	getAllGroups,
	getGroupData,
} from "../api/group.api.ts";
import { minutes } from "../utils/date.utils.ts";
import { useState } from "react";
import type {
	CreateGroupForm,
	EditGroupForm,
	GroupData,
	Guest,
	Member,
	User,
} from "../types/types.ts";
import { useAuth, usePopup } from "./context.hooks.ts";
import { toast } from "../../components/shared/CustomToast.tsx";
import {
	CreateGroupSchema,
	GuestName,
} from "../validators/createGroup.validator.ts";
import {
	createStateForEditGroup,
	getChangedFields,
} from "../utils/group.utils.ts";

export function useGetAllGroups() {
	return useQuery({
		queryKey: ["groups"],
		queryFn: getAllGroups,
		refetchOnWindowFocus: false,
		staleTime: minutes(5),
		placeholderData: keepPreviousData,
	});
}

export function useCreateGroupForm() {
	const { user } = useAuth();
	// Default create group variables
	const [form, setForm] = useState<CreateGroupForm>({
		name: "",
		icon: "home",
		color: "#1337ec",
		users: [user!],
		guests: [],
	});
	const { mutateAsync: createGroup, isPending: creatingGroup } =
		useCreateGroup();

	function changeName(name: string) {
		setForm((prev) => ({
			...prev,
			name: name,
		}));
	}

	function setIcon(icon: string) {
		setForm((prev) => ({
			...prev,
			icon,
		}));
	}

	function setColor(color: string) {
		setForm((prev) => ({
			...prev,
			color,
		}));
	}

	function isFriendSelected(friend: User) {
		return form.users.some(
			(selectedUser) => selectedUser.internal_id === friend.internal_id,
		);
	}

	function selectFriend(friend: User) {
		setForm((prev) => ({
			...prev,
			users: [...prev.users, friend],
		}));
	}

	function unSelectFriend(friend: User) {
		setForm((prev) => ({
			...prev,
			users: prev.users.filter(
				(user) => user.internal_id !== friend.internal_id,
			),
		}));
	}

	function addGuest(guestName: string) {
		const result = GuestName.safeParse(guestName.trim());
		if (!result.success) {
			toast({ message: "Invalid guest name", success: false });
		} else {
			setForm((prev) => ({
				...prev,
				guests: [...prev.guests, result.data!],
			}));
		}
	}

	function removeGuest(guestIndex: number) {
		setForm((prev) => ({
			...prev,
			guests: prev.guests.filter((_, index) => index !== guestIndex),
		}));
	}

	async function submitForm() {
		const result = CreateGroupSchema.safeParse(form);
		if (!result.success) {
			result.error.issues.map((issue) =>
				toast({ message: issue.message, success: false }),
			);
			return;
		}
		if (result.data.users.length === 1 && result.data.guests.length === 0) {
			toast({
				message: "You cannot make a group by yourself",
				success: false,
			});
			return;
		}

		await createGroup(result.data);
	}

	return {
		form,
		changeName,
		setIcon,
		setColor,
		isFriendSelected,
		selectFriend,
		unSelectFriend,
		addGuest,
		removeGuest,
		submitForm,
		creatingGroup,
	};
}

export function useCreateGroup() {
	const { closeCreateGroupPopup } = usePopup();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createGroup,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["groups"] });
			toast({ message: "Created group successfully", success: true });
			closeCreateGroupPopup();
		},
		onError: () => {
			toast({ message: "Error creating group", success: false });
		},
	});
}

export function useGetGroupData(groupId: string) {
	return useQuery({
		queryKey: ["group", groupId],
		queryFn: () => getGroupData(groupId),
		staleTime: minutes(5),
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData,
	});
}

export function useEditGroupForm(groupData: GroupData) {
	const [form, setForm] = useState<EditGroupForm>(
		createStateForEditGroup(groupData),
	);
	const { mutateAsync: editGroup, isPending: editingGroup } = useEditGroup();

	function changeName(name: string) {
		setForm((prev) => ({ ...prev, name }));
	}

	function setIcon(icon: string) {
		setForm((prev) => ({ ...prev, icon }));
	}

	function setColor(color: string) {
		setForm((prev) => ({ ...prev, color }));
	}

	function selectFriend(friend: User) {
		setForm((prev) => {
			// If in case the user was part of the original member list
			// then just remove them from removeMembers and add them back
			// to users
			const isOriginalMember = prev.removeMembers.find(
				(member) => member.internal_id === friend.internal_id,
			);
			if (isOriginalMember) {
				return {
					...prev,
					users: [...prev.users, isOriginalMember],
					removeMembers: prev.removeMembers.filter(
						(member) => member.internal_id !== friend.internal_id,
					),
				};
			}

			// If they weren't part of the original member list
			// they are new so just add them to new users
			return {
				...prev,
				newUsers: [...prev.newUsers, friend],
			};
		});
	}

	function isFriendSelected(friend: User) {
		// If the friend is in new users or existing members then return true
		return [...form.newUsers, ...form.users].some(
			(user) => user.internal_id === friend.internal_id,
		);
	}

	function unSelectFriend(friend: User | Member) {
		setForm((prev) => {
			// If the user is part of the original member list
			// then remove them from users and add them to removeMembers
			const isOriginalMember = prev.users.find(
				(member) => member.internal_id === friend.internal_id,
			);
			if (isOriginalMember) {
				return {
					...prev,
					removeMembers: [...prev.removeMembers, isOriginalMember],
					users: prev.users.filter(
						(member) => member.internal_id !== friend.internal_id,
					),
				};
			}

			// If they weren't part of the original list that means
			// they were newly added remove them from newUsers
			return {
				...prev,
				newUsers: prev.newUsers.filter(
					(user) => user.internal_id !== friend.internal_id,
				),
			};
		});
	}

	function addGuest(name: string) {
		const result = GuestName.safeParse(name.trim());
		if (!result.success) {
			toast({ message: "Invalid guest name", success: false });
		} else {
			setForm((prev) => ({
				...prev,
				newGuests: [...prev.newGuests, result.data!],
			}));
		}
	}

	function removeOriginalGuest(guest: Guest) {
		setForm((prev) => ({
			...prev,
			guests: prev.guests.filter(
				(existingGuest) => existingGuest.member_id !== guest.member_id,
			),
			removeMembers: [...prev.removeMembers, guest as Member],
		}));
	}

	function removeNewGuest(guestIndex: number) {
		setForm((prev) => ({
			...prev,
			newGuests: prev.newGuests.filter(
				(_, index) => index === guestIndex,
			),
		}));
	}

	async function submitForm() {
		const { editGroupRequest, areFieldsDifferent } = getChangedFields(
			form,
			groupData,
		);
		if (!areFieldsDifferent || !editGroupRequest) return;
		await editGroup(editGroupRequest);
	}

	return {
		form,
		changeName,
		setIcon,
		setColor,
		selectFriend,
		isFriendSelected,
		unSelectFriend,
		addGuest,
		removeOriginalGuest,
		removeNewGuest,
		submitForm,
		editingGroup
	};
}

export function useEditGroup() {
	const queryClient = useQueryClient();
	const { closeEditGroupPopup } = usePopup();

	return useMutation({
		mutationFn: editGroup,
		onSuccess: async (_, editGroupRequest) => {
			await queryClient.invalidateQueries({
				queryKey: ["group", editGroupRequest.groupId],
			});
			closeEditGroupPopup();
		},
	});
}

export function useEditGuestName(groupId: string) {
	const { closeEditGuestNamePopup } = usePopup();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: editGuestName,
		onSuccess: (_, variables) => {
			const groupData = queryClient.getQueryData<GroupData>([
				"group",
				groupId,
			]);
			const member = groupData!.members.find(
				(member) => member.member_id === variables.memberId,
			);
			member!.name = variables.name;
			closeEditGuestNamePopup();
		},
		onError: () => {
			toast({ message: "Failed to edit guest's name", success: false });
		},
	});
}
