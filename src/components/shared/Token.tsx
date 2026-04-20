import { usePopup } from "../../lib/hooks/context.hooks.ts";

function Token({
	isCurrentUser,
	avatar_url,
	name,
	onRemove,
}: {
	isCurrentUser?: boolean;
	avatar_url?: string;
	name: string;
	onRemove: () => void;
}) {
	const { openConfirmationPopup } = usePopup();

	return (
		<div
			className={`flex items-center gap-2 ${isCurrentUser ? "bg-primary/20 border-primary/30" : "bg-white/3 border-white/8"} border  pl-1.5 pr-2 py-1.5 rounded-full`}
		>
			{avatar_url ? (
				<img
					alt="token"
					className="w-6 h-6 rounded-full object-cover"
					src={avatar_url}
				/>
			) : (
				<div className="text-white size-6	 rounded-full flex items-center justify-center text-xs border border-white/8 bg-white/10">
					{name[0].toUpperCase()}
				</div>
			)}
			<span
				className={`text-xs font-bold ${isCurrentUser ? "text-primary" : "text-slate-400"}`}
			>
				{avatar_url ? name : `${name} (G)`}
			</span>
			{!isCurrentUser && (
				<button
					onClick={() =>
						openConfirmationPopup({
							question:
								"Are you sure you want to remove this member from the group?",
							onYes: onRemove,
						})
					}
					className={`${isCurrentUser ? "text-primary" : "text-slate-400"} hover:text-white flex items-center justify-center transition-all`}
				>
					<span className="material-symbols-outlined text-[14px]">
						close
					</span>
				</button>
			)}
		</div>
	);
}

export default Token;
