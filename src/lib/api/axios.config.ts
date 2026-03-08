import axios, {type AxiosError} from "axios";
import {BACKEND_URL} from "../constants/constants.ts";
import {AppError} from "../errors/app.error.ts";

// Create axios instance with configs
const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

// Add an error interceptor to convert each error to AppError class
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