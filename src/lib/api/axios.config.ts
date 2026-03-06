import axios, {type AxiosError} from "axios";
import {BACKEND_URL} from "../constants/constants.ts";
import {AppError} from "../errors/app.error.ts";

const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message?: string }>) => {
        const serverMessage = error.response?.data?.message;

        return Promise.reject(
            new AppError(serverMessage!)
        );
    }
)

export default api;