import type { Member, SplitMode } from "../../lib/types/types.ts";
import { useAuth } from "../../lib/hooks/context.hooks.ts";

function ExpenseMemberPicker({
	member,
	isSelected,
	changeInvolvement,
	owedAmountString,
	splitMode,
	parts,
	addPart,
	removePart,
	changeOwedAmount,
}: {
	member: Member;
	isSelected: boolean;
	changeInvolvement: () => void;
	owedAmountString: string;
	splitMode: SplitMode;
	parts: number;
	addPart: () => void;
	removePart: () => void;
	changeOwedAmount: (memberId: number, owedAmountString: string) => void;
}) {
	const { user } = useAuth();

	return (
		<div
			onClick={splitMode === "equally" ? changeInvolvement : undefined}
			className="p-4 flex items-center justify-between hover:bg-white/[0.07] transition-all cursor-pointer group"
		>
			<div className="flex items-center gap-3">
				<div className="w-10 h-10 rounded-full flex items-center justify-center  p-0.5 bg-primary/20 text-white">
					{member.avatar_url ? (
						<img
							alt={`Profile photo of ${member.name}`}
							className="w-full h-full rounded-full object-cover"
							src={member.avatar_url}
						/>
					) : (
						member.name[0].toUpperCase()
					)}
				</div>
				<div className="flex flex-col">
					<span className="text-sm font-bold text-white">
						{`${member.name} ${member.internal_id === user!.internal_id ? "(You)" : ""}`}
					</span>
					<span className="text-[10px] text-slate-500">
						{member.internal_id ? "User" : "Guest"}
					</span>
				</div>
			</div>
			<span className="flex items-center gap-3">
				<div className="flex items-center gap-1 bg-white/5 border border-white/8 text-slate-500 px-3 py-1 rounded-xl">
					<span className="text-slate-500 text-md">$</span>
					{splitMode === "specific" ? (
						<input
							className="text-white placeholder-slate-600 text-md w-30 p-0 m-0"
							value={owedAmountString}
							onChange={(e) =>
								changeOwedAmount(
									member.member_id,
									e.target.value,
								)
							}
							placeholder="0.00"
							type="number"
						/>
					) : owedAmountString !== "" ? (
						owedAmountString
					) : (
						"0.00"
					)}
				</div>
				{splitMode === "equally" &&
					(isSelected ? (
						<div className="size-6 rounded-full border-2 border-primary bg-primary flex items-center justify-center">
							<span className="material-symbols-outlined text-white text-base font-bold">
								check
							</span>
						</div>
					) : (
						<div className="size-6 rounded-full border-2 border-white/20" />
					))}
				{splitMode === "parts" && (
					<>
						<div
							onClick={addPart}
							className="p-0 size-8 text-xl rounded-full border border-white/8 bg-white/5 text-slate-400 text-center flex items-center justify-center hover:bg-primary/10 hover:text-white transition duration-300"
						>
							+
						</div>
						<span className="text-slate-400 w-2 text-center">
							{parts}
						</span>
						<div
							onClick={parts !== 0 ? removePart : undefined}
							className="p-0 size-8 text-xl rounded-full border border-white/8 bg-white/5 text-slate-400 text-center flex items-center justify-center hover:bg-primary/10 hover:text-white transition duration-300"
						>
							-
						</div>
					</>
				)}
			</span>
		</div>
	);
}

export default ExpenseMemberPicker;
