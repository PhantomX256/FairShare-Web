import { authenticateWithGoogle, logoutComplete } from "../api/auth.api.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./context.hooks.ts";
import { useNavigate } from "react-router-dom";

export function useAuthenticateWithGoogle() {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: authenticateWithGoogle,
		onSuccess: (data) => {
			queryClient.setQueryData(["user"], data);
			toast("Authentication successful", true);
			navigate("/dashboard");
		},
		onError: () => {
			toast("Error during authentication", false);
		},
	});
}

export function useLogoutComplete() {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: logoutComplete,
		onSuccess: () => {
			// Clear all cache
			queryClient.clear();
			// After clearing set user to null to prevent refetching
			// of user data in AuthProvider
			queryClient.setQueryData(["user"], null);
			navigate("/");
			toast("Logged out successfully", true);
		},
		onError: () => {
			toast("Error during logout", false);
		},
	});
}
