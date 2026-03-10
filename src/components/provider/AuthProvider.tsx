import React from "react";
import { AuthContext } from "../context/AuthContext.ts";
import {
	useAuthenticateWithGoogle,
	useLogoutComplete,
} from "../../lib/hooks/auth.hooks.ts";
import { useGetCurrentUserData } from "../../lib/hooks/user.hooks.ts";
import Loader from "../shared/Loader.tsx";

/**
 *	I'm gonna be real with you here I tried to understand this shit
 *	but, I'm coding this while drinking I don't fucking know how this
 *	works. I'm pretty sure nobody is gonna care, so fuck it.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
	const { mutateAsync: authenticateWithGoogle } = useAuthenticateWithGoogle();
	const { mutateAsync: logoutComplete, isPending: isLoggingOut } =
		useLogoutComplete();
	const { data: userData, isFetching } = useGetCurrentUserData();

	// Instead of using states we're using queryKeys in queryClient
	// These are here to send to children components
	const user = userData ?? null;
	const isLoggedIn = !!userData;

	// Login function that authenticates with Google and sets the query key
	async function login(credential: string) {
		await authenticateWithGoogle(credential);
	}

	// Logout function that removes cookies and removes query key
	async function logout() {
		await logoutComplete();
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
