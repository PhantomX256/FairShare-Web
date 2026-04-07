import type { Expense, GroupData } from "../../../lib/types/types.ts";
import { getDayMonthAndYear } from "../../../lib/utils/date.utils.ts";
import { Milli } from "../../../lib/utils/expense.utils.ts";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function ExpenseItem({ expense }: { expense: Expense }) {
	const { groupId } = useParams();
	const queryClient = useQueryClient();
	const { group, members } = queryClient.getQueryData<GroupData>([
		"group",
		groupId!,
	])!;

	const paidBy = members.find((m) => m.member_id === expense.paid_by[0])!;

	return (
		<div className="glass-card  border border-white/8 bg-white/5 p-4 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all group">
			<div className="flex items-center gap-4">
				<div
					style={{
						backgroundColor: `${group.color}30`,
						color: group.color,
					}}
					className="w-12 h-12 rounded-xl flex items-center justify-center"
				>
					<span className="material-symbols-outlined">
						{expense.icon}
					</span>
				</div>
				<div>
					<p className="font-semibold text-white">{expense.title}</p>
					<p className="text-xs text-gray-500">
						Paid by{" "}
						<span className="text-gray-300">
							{`${paidBy.name} ${expense.paid_by.length > 1 ? `+${expense.paid_by.length - 1} more` : ""}`}
						</span>{" "}
						•{getDayMonthAndYear(expense.created_at)}
					</p>
				</div>
			</div>
			<div className="text-right">
				<p className="font-bold text-lg">
					${Milli.formatMilli(expense.amount)}
				</p>
				<p
					className={`text-[10px] uppercase tracking-tighter ${
						expense.user_balance >= 0
							? "text-emerald-500"
							: "text-red-500"
					}`}
				>
					Your Balance: {expense.user_balance >= 0 ? "+" : "-"}$
					{Milli.formatMilli(Math.abs(expense.user_balance))}
				</p>
			</div>
		</div>
	);
}

export default ExpenseItem;
