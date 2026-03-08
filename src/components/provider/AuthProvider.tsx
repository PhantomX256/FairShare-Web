import React from "react";
import { AuthContext } from "../context/AuthContext.ts";
import {
	useAuthenticateWithGoogle,
	useLogoutComplete,
} from "../../lib/hooks/auth.hooks.ts";
import { useGetCurrentUserData } from "../../lib/hooks/user.hooks.ts";
import Loader from "../shared/Loader.tsx";
import { useQueryClient } from "@tanstack/react-query";

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const queryClient = useQueryClient();
	const { mutateAsync: authenticateWithGoogle } = useAuthenticateWithGoogle();
	const { mutateAsync: logoutComplete, isPending: isLoggingOut } =
		useLogoutComplete();
	const { data: userData, isFetching } = useGetCurrentUserData();

	const user = userData ?? null;
	const isLoggedIn = !!userData;

	async function login(credential: string) {
		const user = await authenticateWithGoogle(credential);
		queryClient.setQueryData(["user"], user);
	}

	async function logout() {
		await logoutComplete();
		queryClient.setQueryData(["user"], null);
	}

	return (
		<AuthContext.Provider
			value={{ user, isLoggedIn, login, logout, isLoggingOut }}
		>
			{isFetching ? (
				<div className="min-h-screen flex items-center justify-center">
					<Loader size={48} />
				</div>
			) : (
				children
			)}
		</AuthContext.Provider>
	);
}
