import { toast as sonnerToast } from "sonner";
import type { ToastProps } from "../../lib/types/types.ts";

function Toast({ message, success, id }: ToastProps) {
	return (
		<div onClick={() => sonnerToast.dismiss(id)} className="cursor-default fixed bottom-4 right-4 flex flex-col gap-2 z-50">
			<div className="glass max-w-75 min-w-75 flex items-start gap-4 p-4 rounded-xl shadow-2xl">
				<div
					className={`shrink-0 size-10 rounded-full bg-emerald-500/20 flex items-center justify-center ${success ? "text-emerald-500" : "text-rose-500"}`}
				>
					<span className="material-symbols-outlined">
						{success ? "check_circle" : "error"}
					</span>
				</div>
				<div className="flex-1 pt-1">
					<p className="text-slate-500 dark:text-slate-400 text-sm mt-1 leading-relaxed">
						{message}
					</p>
				</div>
				<button
					onClick={() => sonnerToast.dismiss(id)}
					className="text-slate-400 hover:text-slate-100 transition-colors"
				>
					<span className="material-symbols-outlined text-sm">
						close
					</span>
				</button>
			</div>
		</div>
	);
}

export default Toast;
