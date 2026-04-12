import type { Member } from "../../../lib/types/types.ts";
import { Milli } from "../../../lib/utils/expense.utils.ts";

function MemberItem({
	member,
	isCurrentUser,
	isGuest,
	onClick,
	balance,
}: {
	member: Member;
	isCurrentUser: boolean;
	isGuest: boolean;
	onClick?: () => void;
	balance: number;
}) {
	const isBalanceNegative = balance < 0;
	const color = isBalanceNegative ? "red-500" : "emerald-500";

	return (
		<>
			<div className="p-4 flex items-center justify-between hover:bg-white/8 transition-all group">
				<div className="flex items-center gap-2">
					<div
						className={`size-9 rounded-full border-2 flex items-center justify-center border-${color} p-0.5 bg-primary/20`}
					>
						{isGuest ? (
							member.name[0].toUpperCase()
						) : (
							<img
								alt={`Profile photo of ${member.name}`}
								className="w-full h-full rounded-full object-cover"
								src={member.avatar_url}
							/>
						)}
					</div>
					<div>
						<p className="text-xs font-semibold">
							{`${isCurrentUser ? "You" : member.name} ${isGuest ? "(G)" : ""}`}
						</p>
						<p
							className={`text-[9px] text-${color} font-bold uppercase tracking-widest`}
						>
							{isBalanceNegative ? "Owes" : "Is Owed"}
						</p>
					</div>
					{onClick && (
						<button
							onClick={onClick}
							className="p-0 m-0 text-transparent group-hover:text-gray-400 hover:text-white transition-all duration-300"
						>
							<span className="material-symbols-outlined text-[5px] leading-none">
								edit
							</span>
						</button>
					)}
				</div>
				<p className={`text-${color} font-bold text-sm`}>
					{isBalanceNegative ? "-" : "+"}$
					{Milli.commaSeparatedFormat(Math.abs(balance))}
				</p>
			</div>
		</>
	);
}

export default MemberItem;
