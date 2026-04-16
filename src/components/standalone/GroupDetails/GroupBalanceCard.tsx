import type { Group } from "../../../lib/types/types.ts";
import { getMonthAndYear } from "../../../lib/utils/date.utils.ts";
import { usePopup } from "../../../lib/hooks/context.hooks.ts";
import { Milli } from "../../../lib/utils/expense.utils.ts";

function GroupBalanceCard({
	group,
	isFetching,
	userBalance,
}: {
	group?: Group;
	isFetching: boolean;
	userBalance: number;
}) {
	const { openAddExpensePopup } = usePopup();

	const isUserBalanceNegative = userBalance < 0;

	return (
		<div className="lg:col-span-2 glass-card border border-white/8 bg-white/5 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
			{isFetching ? (
				<>
					<div className="w-24 h-24 bg-white/10 animate-pulse rounded-2xl" />
					<div className="w-1/3 mr-auto h-15 bg-white/10 animate-pulse rounded" />
					<div className="w-1/3 h-15 bg-white/10 animate-pulse rounded" />
				</>
			) : (
				<>
					<div
						style={{ backgroundColor: `${group!.color}30` }}
						className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-32 -mt-32"
					></div>
					<div
						style={{
							backgroundColor: `${group!.color}20`,
							borderColor: `${group!.color}30`,
						}}
						className="size-24 rounded-2xl  flex items-center justify-center border shrink-0"
					>
						<span
							style={{ fontSize: "40px", color: group!.color }}
							className="material-symbols-outlined"
						>
							{group!.icon}
						</span>
					</div>
					<div className="flex-1 flex flex-col justify-center gap-2 text-center md:text-left">
						<h1 className="text-white text-4xl font-headline font-bold">
							{group!.name}
						</h1>
						<span className="text-gray-500 text-sm">
							Created {getMonthAndYear(group!.created_at)}
						</span>
					</div>
					<div className="shrink-0 flex flex-col items-center md:items-end">
						<p className="text-gray-400 text-xs font-label uppercase tracking-wider mb-1">
							{userBalance > 0
								? "You are owed"
								: userBalance === 0
									? "You are Settled Up"
									: "You owe"}
						</p>
						{userBalance !== 0 && (
							<p
								className={`text-4xl font-headline font-bold text-${isUserBalanceNegative ? "red-500" : "emerald-500"}`}
							>
								{isUserBalanceNegative ? "-" : "+"}$
								{Milli.commaSeparatedFormat(
									Math.abs(userBalance),
								)}
							</p>
						)}
						<button
							onClick={openAddExpensePopup}
							className="mt-4 bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold text-sm transition-all shadow-lg shadow-primary/20"
						>
							Add Expense
						</button>
					</div>{" "}
				</>
			)}
		</div>
	);
}

export default GroupBalanceCard;
