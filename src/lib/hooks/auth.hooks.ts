import { authenticateWithGoogle, logoutComplete } from "../api/auth.api.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "../../components/shared/CustomToast.tsx";

export function useAuthenticateWithGoogle() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: authenticateWithGoogle,
		onSuccess: (data) => {
			queryClient.setQueryData(["user"], data);
			toast({ message: "Authentication successful", success: true });
			navigate("/dashboard");
		},
		onError: () => {
			toast({ message: "Error during authentication", success: false });
		},
	});
}

export function useLogoutComplete() {
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
			toast({ message: "Logged out successfully", success: true });
		},
		onError: () => {
			toast({ message: "Error during logout", success: false });
		},
	});
}
