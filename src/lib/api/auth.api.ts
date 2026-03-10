import api from "./axios.config.ts";
import {GOOGLE_AUTH_URL, LOGOUT_URL} from "../constants/api.constants.ts";
import type {User} from "../types/types.ts";

export async function authenticateWithGoogle(credential: string): Promise<User> {
    const { data } = await api.post(GOOGLE_AUTH_URL, { credential });
    return data.user;
}

export async function logoutComplete() {
    await api.post(LOGOUT_URL, {  });
}