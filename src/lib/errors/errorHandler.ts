import { AppError } from "./app.error.ts";
import { ERROR_SEVERITY } from "../constants/constants.ts";

/**
 *  Universal error handler that handles rendering of
 *  toast
 */
export function handleError(
	error: unknown,
	toast: (message: string, success: boolean) => void,
): void {
	if (error instanceof AppError) {
		switch (error.severity) {
			case ERROR_SEVERITY.TOAST:
				toast(error.message, false);
				break;
			case ERROR_SEVERITY.LOG:
				console.error(error.message);
				break;
			default:
				toast("An unexpected error occurred.", false);
				console.error(error);
		}
	} else {
		toast("An unexpected error occurred.", false);
		console.error(error);
	}
}
