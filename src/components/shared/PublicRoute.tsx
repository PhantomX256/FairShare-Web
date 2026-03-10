import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../lib/hooks/context.hooks.ts";

function PublicRoute() {
	const { isLoggedIn } = useAuth();

	// On Mount check if the user is logged in
	// If yes then send them to a private route
	if (isLoggedIn) return <Navigate to="/dashboard" replace />

	return <Outlet />;
}

export default PublicRoute;
