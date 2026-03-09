import { useToastNavMutation } from "./custom.hooks.ts";
import { sendFriendRequest } from "../api/friend.api.ts";

export function useSendFriendRequest() {
	return useToastNavMutation(sendFriendRequest, "Friend request sent successfully");
}