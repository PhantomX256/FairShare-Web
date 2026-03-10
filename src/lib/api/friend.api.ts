import api from "./axios.config.ts";
import {
	GET_RECEIVED_REQUEST_URL,
	GET_SENT_REQUEST_URL,
	SEND_FRIEND_REQUEST_URL,
} from "../constants/api.constants.ts";
import type {
	ReceivedFriendRequest,
	SentFriendRequest,
} from "../types/types.ts";

export async function sendFriendRequest(payload: string) {
	await api.post(SEND_FRIEND_REQUEST_URL, { friend: payload });
}

export async function getAllReceivedFriendRequests(): Promise<ReceivedFriendRequest[]> {
	const { data } = await api.get(GET_RECEIVED_REQUEST_URL);
	return data.receivedFriendRequests;
}

export async function getAllSendFriendRequests(): Promise<SentFriendRequest[]> {
	const { data } = await api.get(GET_SENT_REQUEST_URL);
	return data.sentFriendRequests;
}