import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/hooks/context.hooks.ts";
import { useEffect } from "react";

function PublicRoute() {
	const navigate = useNavigate();
	const { isLoggedIn } = useAuth();

	// On Mount check if the user is logged in
	// If yes then send them to a private route
	useEffect(() => {
		if (isLoggedIn) navigate("/dashboard");
	})

	return <Outlet />;
}

export default PublicRoute;
