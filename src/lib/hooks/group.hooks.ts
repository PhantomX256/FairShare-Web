import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createGroup, getAllGroups, getGroupData } from "../api/group.api.ts";
import { minutes } from "../utils/date.utils.ts";
import { useState } from "react";
import type { CreateGroupForm, User } from "../types/types.ts";
import { useAuth, usePopup } from "./context.hooks.ts";
import { toast } from "../../components/shared/CustomToast.tsx";
import {
	CreateGroupSchema,
	GuestName,
} from "../validators/createGroup.validator.ts";

export function useGetAllGroups() {
	return useQuery({
		queryKey: ["groups"],
		queryFn: getAllGroups,
		refetchOnWindowFocus: false,
		staleTime: minutes(5),
	});
}

export function useCreateGroupForm() {
	const { user } = useAuth();
	const [form, setForm] = useState<CreateGroupForm>({
		name: "",
		icon: "home",
		color: "#1337ec",
		users: [user!],
		guests: [],
	});
	const { mutateAsync: createGroup, isPending: creatingGroup } = useCreateGroup();

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
			toast({message: "Invalid guest name", success: false});
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
			result.error.issues.map((issue) => toast({message: issue.message, success: false}));
			return;
		}
		if (result.data.users.length === 1 && result.data.guests.length === 0) {
			toast({message: "You cannot make a group by yourself", success: false});
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
			toast({message: "Created group successfully", success: true});
			closeCreateGroupPopup();
		},
		onError: () => {
			toast({message: "Error creating group", success: false});
		},
	});
}

export function useGetGroupData(groupId: string) {
	return useQuery({
		queryKey: ["group", groupId],
		queryFn: () => getGroupData(groupId),
		staleTime: minutes(5),
		refetchOnWindowFocus: false,
	})
}
