import { useToastNavMutation } from "./custom.hooks.ts";
import {
	getAllReceivedFriendRequests,
	getAllSendFriendRequests,
	sendFriendRequest,
} from "../api/friend.api.ts";
import { useQuery } from "@tanstack/react-query";

export function useSendFriendRequest() {
	return useToastNavMutation(
		sendFriendRequest,
		"Friend request sent successfully",
	);
}

export function useGetAllReceivedFriendRequests() {
	return useQuery({
		queryKey: ["receivedRequests"],
		queryFn: getAllReceivedFriendRequests,
		refetchOnWindowFocus: false,
	});
}

export function useGetAllSentFriendRequests(enabled: boolean) {
	return useQuery({
		queryKey: ["sentRequests"],
		queryFn: getAllSendFriendRequests,
		refetchOnWindowFocus: false,
		enabled,
		staleTime: Infinity
	})
}
