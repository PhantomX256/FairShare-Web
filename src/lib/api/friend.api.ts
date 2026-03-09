import api from "./axios.config.ts";
import { SEND_FRIEND_REQUEST_URL } from "../constants/api.constants.ts";

export function sendFriendRequest(payload: string) {
	return api.post(SEND_FRIEND_REQUEST_URL, { friend: payload });
}