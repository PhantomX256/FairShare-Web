import { useNavigate } from "react-router-dom";

function ExpenseDetailsHeader() {
	const navigate = useNavigate();

	return (
		<header className="h-16 border-b border-white/8 flex items-center justify-between px-8 shrink-0 bg-black/50 backdrop-blur-md z-30">
			<div className="flex items-center gap-4">
				<button
					onClick={() => navigate(-1)}
					className="text-neutral-400 hover:text-white transition-colors flex items-center"
				>
					<span className="material-symbols-outlined">
						arrow_back
					</span>
				</button>
				<h2 className="font-headline text-white font-semibold text-lg">
					Expense Details
				</h2>
			</div>
			<div className="flex items-center gap-4">
				<button className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/5">
					<span className="material-symbols-outlined text-xl">
						edit
					</span>
					<span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">
						Edit
					</span>
				</button>
				<button className="text-red-400 hover:text-error-dim transition-colors flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-red-400/15">
					<span className="material-symbols-outlined text-xl">
						delete
					</span>
					<span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">
						Delete
					</span>
				</button>
			</div>
		</header>
	);
}

export default ExpenseDetailsHeader;
