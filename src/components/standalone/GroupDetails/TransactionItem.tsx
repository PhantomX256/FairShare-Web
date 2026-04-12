import type { Balance, Member } from "../../../lib/types/types.ts";
import { Milli } from "../../../lib/utils/expense.utils.ts";

function TransactionItem({
	balance,
	member,
}: {
	balance: Balance;
	member: Member;
}) {
	const isBalanceNegative = balance.balance < 0;

	return (
		<div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 transition-all">
			<div className="flex items-center gap-3">
				{member.avatar_url ? (
					<img
						src={member.avatar_url}
						alt={member.name}
						className={`size-8 rounded-full text-xs border-2 border-${isBalanceNegative ? "red-500" : "emerald-500"}`}
					/>
				) : (
					<div
						className={`size-8 rounded-full bg-primary/10 text-white flex items-center justify-center text-xs font-bold border-2 border-${isBalanceNegative ? "red-500" : "emerald-500"}`}
					>
						{member.name[0].toUpperCase()}
					</div>
				)}
				<span className="text-sm">Sarah</span>
			</div>
			<span
				className={`text-sm font-bold text-${isBalanceNegative ? "red-500" : "emerald-500"}`}
			>
				{isBalanceNegative ? "-" : "+"}$
				{Milli.commaSeparatedFormat(Math.abs(balance.balance))}
			</span>
		</div>
	);
}

export default TransactionItem;
