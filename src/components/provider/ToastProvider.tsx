import { type ReactNode, useCallback, useRef, useState } from "react";
import { ToastContext } from "../context/ToastContext";
import type { Toast } from "../../lib/types/types.ts";

export function ToastProvider({ children }: { children: ReactNode }) {
	// Keeps track of how many toasts to render
	const [toasts, setToasts] = useState<Toast[]>([]);

	// Assign unique id's to each toast
	const idRef = useRef(0);
	
	// Remove the toast
	function dismiss(id: number) {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	}

	// Add a toast
	const toast = useCallback((message: string, success: boolean) => {
		// Get ID
		const id = ++idRef.current;

		// Add to toasts
		setToasts((prev) => [...prev, { id, message, success }]);

		// Dismiss the toast after 4 sec
		setTimeout(() => dismiss(id), 4000);
	}, []);

	return (
		<ToastContext.Provider value={{ toast, toasts, dismiss }}>
			{children}
		</ToastContext.Provider>
	);
}
