import { useAuth } from "../../../lib/hooks/context.hooks.ts";
import { useState } from "react";

function ShareIdCard() {
	const [isCopied, setIsCopied] = useState(false);
	const { user } = useAuth();

	return (
		<div className="glass-card bg-white/3 border border-white/8 rounded-2xl p-6 shadow-sm flex items-center justify-between relative overflow-hidden group">
			<div className="relative z-10">
				<p className="text-slate-400 text-sm font-medium mb-1">
					Your Share ID
				</p>
				<div className="flex items-center gap-3">
					<span className="text-2xl font-black tracking-tight text-white">
						{user!.id}
					</span>
					<button
						onClick={async () => {
							await navigator.clipboard.writeText(user!.id);
							setIsCopied(true);
							setTimeout(() => setIsCopied(false), 2000);
						}}
						className="p-1.5 rounded-xl flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
					>
						<span className="material-symbols-outlined text-lg">
							{isCopied ? "check" : "content_copy"}
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default ShareIdCard;
