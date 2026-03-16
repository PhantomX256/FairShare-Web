import { ERROR_SEVERITY } from "../constants/constants.ts";
import { useContext } from "react";
import { AppError } from "../errors/app.error.ts";
import { AuthContext } from "../../components/context/AuthContext.ts";
import { PopupContext } from "../../components/context/PopupContext.ts";

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context)
		throw new AppError(
			"useAuth must be used inside AuthProvider",
			ERROR_SEVERITY.FATAL,
		);
	return context;
}

export function usePopup() {
	const context = useContext(PopupContext);
	if (!context)
		throw new AppError(
			"usePopup must be used inside PopupProvider",
			ERROR_SEVERITY.FATAL,
		);
	return context;
}
