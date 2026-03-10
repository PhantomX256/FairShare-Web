import { useToast } from "../../lib/hooks/context.hooks.ts";

function Toast() {
	const { toasts, dismiss } = useToast();

	return (
		<div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
			{toasts.map((t) => (
				<div
					key={t.id}
					className="glass max-w-75 min-w-75 flex items-start gap-4 p-4 rounded-xl shadow-2xl"
				>
					<div
						className={`shrink-0 size-10 rounded-full bg-emerald-500/20 flex items-center justify-center ${t.success ? "text-emerald-500" : "text-rose-500"}`}
					>
						<span className="material-symbols-outlined">
							{t.success ? "check_circle" : "error"}
						</span>
					</div>
					<div className="flex-1 pt-1">
						<p className="text-slate-500 dark:text-slate-400 text-sm mt-1 leading-relaxed">
							{t.message}
						</p>
					</div>
					<button
						onClick={() => dismiss(t.id)}
						className="text-slate-400 hover:text-slate-100 transition-colors"
					>
						<span className="material-symbols-outlined text-sm">
							close
						</span>
					</button>
				</div>
			))}
		</div>
	);
}

export default Toast;
