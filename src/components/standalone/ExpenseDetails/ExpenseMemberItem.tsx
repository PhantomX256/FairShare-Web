import type { ExpenseData, SplitMode } from "../../../lib/types/types.ts";
import { Milli } from "../../../lib/utils/expense.utils.ts";

function ExpenseMemberItem({
	expenseMember,
	splitMode,
}: {
	expenseMember: ExpenseData["expenseMembers"][0];
	splitMode: SplitMode | null;
}) {
	console.log(expenseMember);

	return (
		<div className="glass-card bg-white/5 border border-white/8 p-5 rounded-2xl flex items-center justify-between transition-colors group hover:bg-white/10">
			<div className="flex items-center gap-4">
				{expenseMember.avatar_url ? (
					<img
						alt={`Avatar of ${expenseMember.name}`}
						className="w-12 h-12 rounded-full border-2 border-white/8 p-0.5"
						src={expenseMember.avatar_url}
					/>
				) : (
					<div className="size-12 rounded-full bg-primary/10 border-2 border-white/8 p-0.5 text-white flex items-center justify-center text-lg">
						{expenseMember.name[0].toUpperCase()}
					</div>
				)}
				<div>
					<p className="font-bold text-white">{expenseMember.name}</p>
				</div>
			</div>
			<div className="text-right">
				<p className="font-black text-lg text-red-500">
					-${Milli.commaSeparatedFormat(expenseMember.owed_amount)}
				</p>
			</div>
		</div>
	);
}

export default ExpenseMemberItem;
