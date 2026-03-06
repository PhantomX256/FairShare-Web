import {useMutation} from "@tanstack/react-query";
import {authenticateWithGoogle} from "../api/auth.api.ts";
import {handleError} from "../errors/errorHandler.ts";
import {useNavigate} from "react-router-dom";
import {useToast} from "./context.hooks.ts";

export function useAuthenticateWithGoogle() {
    const { toast } = useToast();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: authenticateWithGoogle,
        onSuccess: () => {
            toast("Login successful", true);
            navigate("/dashboard");
        },
        onError: (error) => {
            handleError(error, toast);
        }
    })
}