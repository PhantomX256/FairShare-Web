import { authenticateWithGoogle, logoutComplete } from "../api/auth.api.ts";
import { useToastNavMutation } from "./custom.hooks.ts";

export function useAuthenticateWithGoogle() {
	return useToastNavMutation(
		authenticateWithGoogle,
		"Authentication successful",
		"/dashboard",
	);
}

export function useLogoutComplete() {
	return useToastNavMutation(logoutComplete, "Logged out successfully", "/");
}
