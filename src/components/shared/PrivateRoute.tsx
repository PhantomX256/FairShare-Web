import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../lib/hooks/context.hooks.ts";

function PrivateRoute() {
	const { isLoggedIn } = useAuth();

	// On mount, check if the user is logged in
	// If not then send them to a public route
	if (!isLoggedIn) return <Navigate to="/" replace />

	return <Outlet />;
}

export default PrivateRoute;
