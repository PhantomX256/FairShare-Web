import SettlementItem from "./SettlementItem.tsx";

function SettlementsCard({ isFetching }: { isFetching: boolean }) {
	return (
		<div className="text-white glass-card bg-white/5 border border-white/8 rounded-2xl p-6 flex flex-col justify-between">
			<h3 className="font-headline font-semibold text-sm text-gray-400 uppercase tracking-widest mb-4">
				Settle Up
			</h3>
			<div className="space-y-4">
				{isFetching ? (
					<div className="bg-white/5 border border-white/8 rounded-xl p-3 h-12 flex items-center justify-between">
						<div className="flex flex-1 items-center gap-3">
							<div className="w-8 h-8 bg-white/10 animate-pulse rounded-full" />
							<div className="w-1/2 h-4 bg-white/10 animate-pulse rounded" />
						</div>
						<div className="w-10 h-4 bg-white/10 animate-pulse rounded" />
					</div>
				) : (
					<SettlementItem />
				)}
			</div>
			<button className="mt-6 w-full text-center py-2 text-xs font-bold text-primary border border-primary/30 rounded-lg hover:bg-brand-primary hover:text-white transition-all">
				VIEW ALL SETTLEMENTS
			</button>
		</div>
	);
}

export default SettlementsCard;
