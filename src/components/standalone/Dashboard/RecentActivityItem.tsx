import type { RecentActivity } from "../../../lib/types/types.ts";
import { getRelativeTime } from "../../../lib/utils/date.utils.ts";
import { useAuth } from "../../../lib/hooks/context.hooks.ts";
import { Milli } from "../../../lib/utils/expense.utils.ts";
import { Link } from "react-router-dom";

function RecentActivityItem({
	recentActivity,
}: {
	recentActivity: RecentActivity;
}) {
	const { user } = useAuth();
	const isExpenseModified =
		recentActivity.expense.created_at !== recentActivity.expense.updated_at;

	const isUserBalancePositive = recentActivity.user_balance > 0;

	return (
		<Link
			to={`/expense/${recentActivity.expense.id}`}
			className="glass-card bg-white/3 border border-white/8 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/5 transition-all cursor-pointer"
		>
			<div
				style={{
					backgroundColor: `${recentActivity.group.color}30`,
					color: recentActivity.group.color,
				}}
				className="size-12 rounded-xl flex items-center justify-center"
			>
				<span className="material-symbols-outlined">
					{recentActivity.expense.icon}
				</span>
			</div>
			<div className="flex-1">
				<p className="text-sm font-bold">
					{recentActivity.expense.title}
				</p>
				<p className="text-xs text-slate-500">
					{isExpenseModified
						? `${recentActivity.modified_by.internal_id === user!.internal_id ? "You" : recentActivity.modified_by.name} modified in `
						: `${recentActivity.modified_by.internal_id === user!.internal_id ? "You" : recentActivity.modified_by.name} added in `}
					<span className="font-semibold text-slate-300">
						{recentActivity.group.name}
					</span>
				</p>
			</div>
			<div className="text-right">
				<p
					className={`text-sm font-bold ${isUserBalancePositive ? "text-emerald-500" : "text-red-500"}`}
				>{`${isUserBalancePositive ? "+" : "-"}$${Milli.commaSeparatedFormat(Math.abs(recentActivity.user_balance))}`}</p>
				<p className="text-[10px] text-slate-500 font-bold tracking-tight">
					{`${getRelativeTime(recentActivity.expense.updated_at)} ago`}
				</p>
			</div>
		</Link>
	);
}

export default RecentActivityItem;
