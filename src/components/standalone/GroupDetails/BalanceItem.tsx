function BalanceItem() {
	return (
		<div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 transition-all">
			<div className="flex items-center gap-3">
				<div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center text-xs font-bold">
					S
				</div>
				<span className="text-sm">Sarah owes Jordan</span>
			</div>
			<span className="text-sm font-bold text-primary">$25.00</span>
		</div>
	);
}

export default BalanceItem;
