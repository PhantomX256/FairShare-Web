import type { ExpenseData } from "../../../lib/types/types.ts";
import { Milli } from "../../../lib/utils/expense.utils.ts";

function PayerMemberItem({
	expenseMember,
	isCurrentUser,
}: {
	expenseMember: ExpenseData["expenseMembers"][0];
	isCurrentUser?: boolean;
}) {
	return (
		<div className="flex items-center justify-between p-4 hover:bg-white/3 transition-all duration-300">
			<div className="flex items-center gap-3">
				{expenseMember.avatar_url ? (
					<img
						alt={`Avatar of ${expenseMember.name}`}
						className="size-10 rounded-full border-2 border-white/8 p-0.5"
						src={expenseMember.avatar_url}
					/>
				) : (
					<div className="size-10 rounded-full bg-primary/10 border-2 border-white/8 p-0.5 text-white flex items-center justify-center text-lg">
						{expenseMember.name[0].toUpperCase()}
					</div>
				)}
				<div>
					<p className="font-bold text-white text-sm">{`${expenseMember.name} ${isCurrentUser ? "(You)" : ""}`}</p>
					{!expenseMember.is_active && (
						<p className="text-gray-600 text-[10px] uppercase">
							No longer a member
						</p>
					)}
				</div>
			</div>
			<span className="text-sm font-black text-emerald-500">
				${Milli.commaSeparatedFormat(expenseMember.paid_amount)}
			</span>
		</div>
	);
}

export default PayerMemberItem;
