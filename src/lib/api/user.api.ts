import api from "./axios.config.ts";
import {GET_CURRENT_USER_DATA_URL} from "../constants/api.constants.ts";
import type {User} from "../types/types.ts";

export async function getCurrentUserData(): Promise<User> {
    const {data} = await api.get(GET_CURRENT_USER_DATA_URL);
    return data.user[0];
}