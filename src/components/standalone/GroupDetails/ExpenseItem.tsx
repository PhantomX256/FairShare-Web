function ExpenseItem() {
	return (
		<div
			className="glass-card  border border-white/8 bg-white/5 p-4 rounded-2xl flex items-center justify-between hover:bg-white/8 transition-colors group">
			<div className="flex items-center gap-4">
				<div
					className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
					<span className="material-symbols-outlined">
						shopping_cart
					</span>
				</div>
				<div>
					<p className="font-semibold text-white">Groceries</p>
					<p className="text-xs text-gray-500">
						Paid by <span className="text-gray-300">Alex</span> •
						Oct 12, 2024
					</p>
				</div>
			</div>
			<div className="text-right">
				<p className="font-bold text-lg">$84.20</p>
				<p className="text-[10px] text-gray-500 uppercase tracking-tighter">
					Personal split: $21.05
				</p>
			</div>
		</div>
	);
}

export default ExpenseItem;