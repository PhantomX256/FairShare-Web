import FriendItem from "./FriendItem.tsx";
import { useGetAllFriends } from "../../../lib/hooks/friend.hooks.ts";
import { useEffect } from "react";
import { useToast } from "../../../lib/hooks/context.hooks.ts";
import Loader from "../../shared/Loader.tsx";

function FriendsSection() {
	const {
		data: friends,
		isFetching: fetchingFriends,
		isError: friendError,
	} = useGetAllFriends();

	const { toast } = useToast();

	useEffect(() => {
		if (friendError) {
			toast("Error fetching friends", false);
		}
	}, [friendError, toast]);

	return (
		<section className="space-y-4 text-white">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-bold">All Friends</h3>
				<button className="text-sm font-medium text-primary flex items-center gap-1">
					Sort by Alphabet{" "}
					<span className="material-symbols-outlined text-sm">
						unfold_more
					</span>
				</button>
			</div>
			{fetchingFriends ? (
				<div className="text-center mt-10">
					<Loader size={30} />
				</div>
			) : (
				<div className="glass-card bg-white/3 border border-white/8 rounded-2xl overflow-hidden shadow-sm">
					{friends!.length === 0 ? (
						<p className="text-center text-sm p-10 text-slate-500">
							No Friends Found
						</p>
					) : (
						<div className="divide-y divide-white/8">
							{friends!.map((friend) => (
								<FriendItem key={friend.internal_id} friend={friend} />
							))}
						</div>
					)}
				</div>
			)}
			{/*<div className="flex justify-center pt-4">*/}
			{/*	<button className="text-sm font-bold text-slate-500 hover:text-primary transition-colors flex items-center gap-1">*/}
			{/*		View All Friends (18){" "}*/}
			{/*		<span className="material-symbols-outlined text-sm">*/}
			{/*			keyboard_arrow_down*/}
			{/*		</span>*/}
			{/*	</button>*/}
			{/*</div>*/}
		</section>
	);
}

export default FriendsSection;
