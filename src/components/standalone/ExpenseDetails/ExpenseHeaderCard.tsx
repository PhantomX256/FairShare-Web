import type { ExpenseData } from "../../../lib/types/types.ts";
import { getDayMonthAndYear } from "../../../lib/utils/date.utils.ts";
import { Milli } from "../../../lib/utils/expense.utils.ts";

function ExpenseHeaderCard({
	isLoading,
	expense,
	group,
}: {
	isLoading: boolean;
	expense?: ExpenseData["expense"];
	group?: ExpenseData["group"];
}) {
	const color = group ? group.color : "#1337ec";

	return (
		<section className="glass-card bg-white/5 border border-white/8 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
			<div
				style={{
					backgroundColor: `${color}40`,
				}}
				className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-32 -mt-32"
			/>
			{isLoading ? (
				<div className="size-24 rounded-2xl bg-white/10 animate-pulse"></div>
			) : (
				<div
					style={{
						backgroundColor: `${color}20`,
						borderColor: `${color}40`,
					}}
					className="w-24 h-24 rounded-2xl flex items-center justify-center border shrink-0"
				>
					<span
						style={{
							fontSize: "50px",
							color: group ? group.color : "#1337ec",
						}}
						className="material-symbols-outlined"
					>
						{expense && expense.icon}
					</span>
				</div>
			)}
			<div className="flex-1 text-center md:text-left">
				{isLoading ? (
					<div className="w-full h-10 bg-white/10 animate-pulse rounded-md mb-2" />
				) : (
					<h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-2">
						{expense && expense.title}
					</h1>
				)}
				{isLoading ? (
					<div className="w-[75%] h-5 rounded-md bg-white/10 animate-pulse" />
				) : (
					<div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
						<span className="bg-white/5 px-3 py-1 rounded-full text-xs font-medium text-gray-400 border border-white/8 uppercase tracking-widest">
							{group && group.name}
						</span>
						<span className="text-gray-400 text-sm flex items-center gap-1">
							<span className="material-symbols-outlined">
								calendar_today
							</span>{" "}
							{getDayMonthAndYear(expense?.created_at ?? "")}
						</span>
					</div>
				)}
			</div>
			{isLoading ? (
				<div className="w-24 h-20 bg-white/10 animate-pulse rounded-md" />
			) : (
				<div className="shrink-0 flex flex-col items-center md:items-end">
					<p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
						Total Amount
					</p>
					<p className="text-5xl font-black text-white tracking-tighter leading-none">
						${Milli.commaSeparatedFormat(expense?.amount ?? 0)}
					</p>
				</div>
			)}
		</section>
	);
}

export default ExpenseHeaderCard;
