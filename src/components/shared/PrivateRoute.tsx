import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/hooks/context.hooks.ts";
import { useEffect } from "react";

function PrivateRoute() {
	const navigate = useNavigate();
	const { isLoggedIn } = useAuth();

	useEffect(() => {
		if (!isLoggedIn) navigate("/");
	})

	return <Outlet />;
}

export default PrivateRoute;
