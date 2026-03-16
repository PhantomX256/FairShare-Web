import type { ToastProps } from "../../lib/types/types.ts";
import { toast as sonnerToast } from "sonner";
import Toast from "./Toast.tsx";

export function toast(toast: Omit<ToastProps, "id">) {
	return sonnerToast.custom((id) => (
		<Toast message={toast.message} success={toast.success} id={id} />
	));
}
