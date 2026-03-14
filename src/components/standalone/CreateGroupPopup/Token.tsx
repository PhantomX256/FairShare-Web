import type { User } from "../../../lib/types/types.ts";

function Token({
	currentUserId,
	user,
	guestName,
	guestIndex,
	unSelectFriend,
	removeGuest,
}: {
	currentUserId?: number;
	user?: User;
	guestName?: string;
	guestIndex?: number;
	unSelectFriend: (friend: User) => void;
	removeGuest: (guestIndex: number) => void;
}) {
	const isCurrentUser =
		currentUserId && user && currentUserId === user.internal_id;

	return (
		<div
			className={`flex items-center gap-2 ${isCurrentUser ? "bg-primary/20 border-primary/30" : "bg-white/3 border-white/8"} border  pl-1.5 pr-2 py-1.5 rounded-full`}
		>
			{user ? (
				<img
					alt="token"
					className="w-6 h-6 rounded-full object-cover"
					src={user.avatar_url}
				/>
			) : (
				<div className="w-6 h-6 rounded-full flex items-center justify-center text-xs border border-white/8 bg-white/10">
					{guestName![0].toUpperCase()}
				</div>
			)}
			<span
				className={`text-xs font-bold ${isCurrentUser ? "text-primary" : "text-slate-400"}`}
			>
				{user ? user.full_name : `${guestName!} (G)`}
			</span>
			<button
				onClick={() =>
					user ? unSelectFriend(user) : removeGuest(guestIndex!)
				}
				className={`${isCurrentUser ? "text-primary" : "text-slate-400"} hover:text-white flex items-center justify-center transition-all`}
			>
				<span className="material-symbols-outlined text-[14px]">
					close
				</span>
			</button>
		</div>
	);
}

export default Token;
