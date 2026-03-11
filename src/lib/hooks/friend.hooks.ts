import {
	getAllFriends,
	getAllReceivedFriendRequests,
	getAllSendFriendRequests,
	modifyFriendRequest,
	sendFriendRequest,
} from "../api/friend.api.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./context.hooks.ts";
import type {
	ReceivedFriendRequest,
	SentFriendRequest,
	User,
} from "../types/types.ts";
import { minutes } from "../utils/date.utils.ts";

export function useSendFriendRequest(setError: (message: string) => void) {
	const { toast } = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: sendFriendRequest,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["sentRequests"] });
			toast("Friend request sent", true);
		},
		onError: (error) => {
			setError(error.message);
		},
	});
}

export function useGetAllReceivedFriendRequests() {
	return useQuery({
		queryKey: ["receivedRequests"],
		queryFn: getAllReceivedFriendRequests,
		refetchOnWindowFocus: false,
		staleTime: minutes(1)
	});
}

export function useGetAllSentFriendRequests(enabled: boolean) {
	return useQuery({
		queryKey: ["sentRequests"],
		queryFn: getAllSendFriendRequests,
		refetchOnWindowFocus: false,
		enabled,
		staleTime: Infinity,
	});
}

export function useGetAllFriends() {
	return useQuery({
		queryKey: ["friends"],
		queryFn: getAllFriends,
		refetchOnWindowFocus: false,
		staleTime: minutes(5),
	});
}

export function useModifyFriendRequest(incomingFlag: boolean, sender?: User) {
	const { toast } = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			senderId,
			receiverId,
			accept,
		}: {
			senderId: number;
			receiverId: number;
			accept: boolean;
		}) => modifyFriendRequest(senderId, receiverId, accept),
		onSuccess: (_, { senderId, receiverId, accept }) => {
			// If it is an incoming request then remove from the request
			// from received request cache
			if (incomingFlag) {
				queryClient.setQueryData<ReceivedFriendRequest[]>(
					["receivedRequests"],
					(old) =>
						old?.filter(
							(req) => req.sender.internal_id !== senderId,
						) ?? [],
				);
			} else {
				// Else remove it from sent request cache
				queryClient.setQueryData<SentFriendRequest[]>(
					["sentRequests"],
					(old) =>
						old?.filter(
							(req) => req.receiver.internal_id !== receiverId,
						) ?? [],
				);
			}

			// If the request was accepted by the client then
			// update the friends cache with the sender's data
			if (accept && sender)
				queryClient.setQueryData<User[]>(["friends"], (old) => [
					...(old ?? []),
					{ ...sender },
				]);
			toast("Successfully modified the request", true);
		},
		onError: () => {
			toast("Error while modifying request", false);
		},
	});
}
