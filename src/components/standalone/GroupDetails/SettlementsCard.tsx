import SettlementItem from "./SettlementItem.tsx";

function SettlementsCard() {
	return (
		<div className="text-white glass-card bg-white/5 border border-white/8 rounded-2xl p-6 flex flex-col justify-between">
			<h3 className="font-headline font-semibold text-sm text-gray-400 uppercase tracking-widest mb-4">
				Settle Up
			</h3>
			<div className="space-y-4">
				<SettlementItem />
			</div>
			<button className="mt-6 w-full text-center py-2 text-xs font-bold text-primary border border-primary/30 rounded-lg hover:bg-brand-primary hover:text-white transition-all">
				VIEW ALL SETTLEMENTS
			</button>
		</div>
	);
}

export default SettlementsCard;