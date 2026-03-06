import api from "./axios.config.ts";
import {GOOGLE_AUTH_URL} from "../constants/api.constants.ts";

export async function authenticateWithGoogle(credential: string) {
    const { data } = await api.post(GOOGLE_AUTH_URL, { credential });
    return data;
}