import type { User } from "../../../lib/types/types.ts";
import {getRelativeTime} from "../../../lib/utils/date.utils.ts";
import { usePopup } from "../../../lib/hooks/context.hooks.ts";

function FriendItem({ friend, isFriendSidebar=false }: { friend: User, isFriendSidebar?: boolean }) {
	const { openUserProfilePopup } = usePopup();

	return (
		<div onClick={() => openUserProfilePopup(friend.internal_id) } className="flex cursor-pointer items-center justify-between p-4 hover:bg-slate-800/50 transition-colors">
			<div className="flex items-center gap-4">
				<img
					className={`${isFriendSidebar ? "size-10" : "size-12"} rounded-full object-cover`}
					alt={`Portrait of ${friend.full_name}`}
					src={friend.avatar_url}
				/>
				<div>
					<p className={`${isFriendSidebar && "text-sm"} font-bold`}>{friend.full_name}</p>
					<p className="text-xs text-slate-500">{`Friends since ${getRelativeTime(friend.created_at)}`}</p>
				</div>
			</div>
			<div className="text-right">
				<p className="text-xs font-medium text-slate-400 mb-0.5">
					Settled up
				</p>
				{/*<p className="text-green-500 font-black text-lg">$42.50</p>*/}
			</div>
		</div>
	);
}

export default FriendItem;
