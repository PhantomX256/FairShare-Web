import type { Member } from "../../lib/types/types.ts";
import { useAuth } from "../../lib/hooks/context.hooks.ts";

function MemberPicker({
	member,
	isSelected,
	areMultiplePayers,
	changePayer,
	paidAmountString,
	changePayerAmount,
}: {
	member: Member;
	isSelected: boolean;
	areMultiplePayers: boolean;
	changePayer: () => void;
	paidAmountString: string;
	changePayerAmount: (memberId: number, paidAmountString: string) => void;
}) {
	const { user } = useAuth();

	return (
		<div
			onClick={areMultiplePayers ? undefined : changePayer}
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
						{member.user_id ? "User" : "Guest"}
					</span>
				</div>
			</div>
			{!areMultiplePayers &&
				(isSelected ? (
					<div className="size-6 rounded-full border-2 border-primary bg-primary flex items-center justify-center">
						<span className="material-symbols-outlined text-white text-base font-bold">
							check
						</span>
					</div>
				) : (
					<div className="size-6 rounded-full border-2 border-white/20" />
				))}
			{areMultiplePayers && (
				<div className="px-4 py-2 flex gap-1 items-center justify-start bg-white/5 border border-white/8 rounded-lg">
					<span className="text-slate-600 text-md">$</span>
					<input
						className="text-white placeholder-slate-600 text-md w-35 p-0 m-0"
						value={paidAmountString}
						onChange={(e) =>
							changePayerAmount(member.member_id, e.target.value)
						}
						placeholder="0.00"
						type="number"
					/>
				</div>
			)}
		</div>
	);
}

export default MemberPicker;
