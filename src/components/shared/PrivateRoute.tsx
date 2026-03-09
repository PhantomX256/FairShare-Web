import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/hooks/context.hooks.ts";
import { useEffect } from "react";

function PrivateRoute() {
	const navigate = useNavigate();
	const { isLoggedIn } = useAuth();

	// On mount, check if the user is logged in
	// If not then send them to a public route
	useEffect(() => {
		if (!isLoggedIn) navigate("/");
	})

	return <Outlet />;
}

export default PrivateRoute;
