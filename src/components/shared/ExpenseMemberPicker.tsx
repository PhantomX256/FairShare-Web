import type { Member } from "../../lib/types/types.ts";

function ExpenseMemberPicker({
								 member,
								 isSelected,
								 changeInvolvement,
								 owedAmountString
							 }: {
	member: Member;
	isSelected: boolean;
	changeInvolvement: () => void;
	owedAmountString: string;
}) {
	return (
		<div
			onClick={changeInvolvement}
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
						{member.name}
					</span>
					<span className="text-[10px] text-slate-500">
						{member.user_id ? "User" : "Guest"}
					</span>
				</div>
			</div>
			<span className="flex items-center gap-3">
				<div className="flex items-center gap-1 bg-white/5 border border-white/8 text-slate-500 px-3 py-1 rounded-xl">
					<span className="text-slate-500 text-md">
						$
					</span>
					{owedAmountString !== "" ? owedAmountString : "0.00"}
				</div>
				{isSelected ? (
					<div className="size-6 rounded-full border-2 border-primary bg-primary flex items-center justify-center">
						<span className="material-symbols-outlined text-white text-base font-bold">
							check
						</span>
					</div>
				) : (
					<div className="size-6 rounded-full border-2 border-white/20" />
				)}
			</span>
		</div>
	);
}

export default ExpenseMemberPicker;
