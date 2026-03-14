import type { User } from "../../../lib/types/types.ts";

function FriendPicker({
	friend,
	isSelected,
	selectFriend,
	unSelectFriend,
}: {
	friend: User;
	isSelected: boolean;
	selectFriend: (friend: User) => void;
	unSelectFriend: (friend: User) => void;
}) {
	return (
		<button
			onClick={() =>
				isSelected
					? unSelectFriend(friend)
					: selectFriend(friend)
			}
			className="p-4 flex items-center justify-between hover:bg-white/[0.07] transition-all cursor-pointer group"
		>
			<div className="flex items-center gap-3">
				<img
					alt={`Avatar of ${friend.full_name}`}
					className="size-10 rounded-full object-cover"
					src={friend.avatar_url}
				/>
				<div className="flex flex-col">
					<span className="text-sm font-bold text-white">
						{friend.full_name}
					</span>
					<span className="text-[10px] text-slate-500">
						{friend.email}
					</span>
				</div>
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
		</button>
	);
}

export default FriendPicker;
