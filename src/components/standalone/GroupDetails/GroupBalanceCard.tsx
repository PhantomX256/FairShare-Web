function GroupBalanceCard() {
	return (
		<div
			className="lg:col-span-2 glass-card border border-white/8 bg-white/5 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
			<div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
			<div
				className="w-24 h-24 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 shrink-0">
				<span
					style={{ fontSize: "40px" }}
					className="material-symbols-outlined text-primary"
				>
					home
				</span>
			</div>
			<div className="flex-1 flex flex-col justify-center gap-2 text-center md:text-left">
				<h1 className="text-white text-4xl font-headline font-bold mb-2">
					Apartment 4B
				</h1>
				<span
					className="bg-white/5 px-3 py-1 w-max rounded-full text-xs font-medium text-gray-400 border border-white/8 uppercase tracking-widest">
					Shared Household
				</span>
				<span className="text-gray-500 text-sm">Created Jan 2024</span>
			</div>
			<div className="shrink-0 flex flex-col items-center md:items-end">
				<p className="text-gray-400 text-xs font-label uppercase tracking-wider mb-1">
					Total Group Balance
				</p>
				<p className="text-4xl font-headline font-bold text-white">
					$1,240.50
				</p>
				<button
					className="mt-4 bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold text-sm transition-all shadow-lg shadow-primary/20">
					Add Expense
				</button>
			</div>
		</div>
	);
}

export default GroupBalanceCard;