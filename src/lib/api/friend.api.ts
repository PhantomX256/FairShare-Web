import api from "./axios.config.ts";
import {
	GET_FRIENDS_URL,
	GET_RECEIVED_REQUEST_URL,
	GET_SENT_REQUEST_URL,
	FRIEND_REQUEST_URL,
} from "../constants/api.constants.ts";
import type {
	ReceivedFriendRequest,
	SentFriendRequest,
	User
} from "../types/types.ts";

export async function sendFriendRequest(payload: string) {
	await api.post(FRIEND_REQUEST_URL, { friend: payload });
}

export async function getAllReceivedFriendRequests(): Promise<ReceivedFriendRequest[]> {
	const { data } = await api.get(GET_RECEIVED_REQUEST_URL);
	return data.receivedFriendRequests;
}

export async function getAllSendFriendRequests(): Promise<SentFriendRequest[]> {
	const { data } = await api.get(GET_SENT_REQUEST_URL);
	return data.sentFriendRequests;
}

export async function getAllFriends(): Promise<User[]> {
	const { data } = await api.get(GET_FRIENDS_URL);
	return data.friends;
}

export async function modifyFriendRequest(senderId: number, receiverId: number, accept: boolean) {
	await api.put(FRIEND_REQUEST_URL, { senderId, receiverId, accept });
}