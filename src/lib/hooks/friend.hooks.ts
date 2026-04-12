import {
	getAllFriends,
	getAllReceivedFriendRequests,
	getAllSendFriendRequests,
	getFriendData,
	modifyFriendRequest,
	sendFriendRequest,
} from "../api/friend.api.ts";
import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import type {
	ReceivedFriendRequest,
	SentFriendRequest,
	User,
} from "../types/types.ts";
import { minutes } from "../utils/date.utils.ts";
import { toast } from "../../components/shared/CustomToast.tsx";

export function useSendFriendRequest(setError: (message: string) => void) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: sendFriendRequest,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["sentRequests"] });
			toast({ message: "Friend request sent", success: true });
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
		staleTime: minutes(1),
		placeholderData: keepPreviousData,
	});
}

export function useGetAllSentFriendRequests(enabled: boolean) {
	return useQuery({
		queryKey: ["sentRequests"],
		queryFn: getAllSendFriendRequests,
		refetchOnWindowFocus: false,
		enabled,
		staleTime: Infinity,
		placeholderData: keepPreviousData,
	});
}

export function useGetAllFriends() {
	return useQuery({
		queryKey: ["friends"],
		queryFn: getAllFriends,
		refetchOnWindowFocus: false,
		staleTime: minutes(5),
		placeholderData: keepPreviousData,
	});
}

export function useModifyFriendRequest(incomingFlag: boolean, sender?: User) {
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
			toast({
				message: "Successfully modified the request",
				success: true,
			});
		},
		onError: () => {
			toast({ message: "Error while modifying request", success: false });
		},
	});
}

export function useGetFriendData(friendId: string) {
	return useQuery({
		queryKey: ["friend", friendId],
		queryFn: () => getFriendData(friendId),
		refetchOnWindowFocus: false,
		staleTime: minutes(10),
		placeholderData: keepPreviousData,
		enabled: !!friendId,
	});
}
