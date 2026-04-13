import type { Member, Transaction } from "../../../lib/types/types.ts";
import { Milli } from "../../../lib/utils/expense.utils.ts";

function TransactionItem({
	transaction,
	fromMember,
	toMember,
}: {
	transaction: Transaction;
	fromMember: Member;
	toMember: Member;
}) {
	return (
		<div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/8 group hover:bg-white/10 transition-colors">
			<div className="flex items-center gap-1">
				<div className="flex -space-x-2">
					{fromMember.avatar_url ? (
						<img
							src={fromMember.avatar_url}
							alt={fromMember.name}
							className="size-6 rounded-full text-xs border-2 border-red-500"
						/>
					) : (
						<div className="size-6 aspect-square rounded-full bg-primary/10 text-white flex items-center justify-center text-[10px] border-2 border-red-500">
							{fromMember.name[0].toUpperCase()}
						</div>
					)}
					<div className="size-6 aspect-square rounded-full bg-primary/30 flex items-center justify-center relative z-20">
						<span className="material-symbols-outlined block leading-none text-[10px]! text-brand-primary">
							arrow_forward
						</span>
					</div>
					{toMember.avatar_url ? (
						<img
							src={toMember.avatar_url}
							alt={toMember.name}
							className="size-6 rounded-full text-xs border-2 border-emerald-500 z-25"
						/>
					) : (
						<div className="size-6 aspect-square rounded-full bg-primary/10 text-white flex items-center justify-center text-[10px] border-2 border-emerald-500 z-25">
							{toMember.name[0].toUpperCase()}
						</div>
					)}
				</div>
				<p className="text-[11px] font-semibold text-white">
					{fromMember.name.split(" ")[0]} →{" "}
					{toMember.name.split(" ")[0]}
				</p>
			</div>
			<span className="text-xs font-bold text-primary">
				${Milli.commaSeparatedFormat(transaction.amount)}
			</span>
		</div>
	);
}

export default TransactionItem;
