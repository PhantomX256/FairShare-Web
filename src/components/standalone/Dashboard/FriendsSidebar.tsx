import { useGetAllFriends } from "../../../lib/hooks/friend.hooks.ts";
import FriendItem from "../Friends/FriendItem.tsx";
import Loader from "../../shared/Loader.tsx";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "../../shared/CustomToast.tsx";

function FriendsSidebar() {
	const {
		data: friends,
		isFetching: fetchingFriends,
		isError: friendError,
	} = useGetAllFriends();

	useEffect(() => {
		if (friendError)
			toast({ message: "Error fetching friends", success: false });
	}, [friendError]);

	return (
		<section className="space-y-6 text-white">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-bold">Friends</h2>
				<Link
					to="/friends"
					className="text-primary text-sm font-bold hover:underline"
				>
					Add
				</Link>
			</div>
			<div className="glass-card bg-white/3 border border-white/8 rounded-2xl overflow-hidden divide-y divide-white/5">
				{fetchingFriends ? (
					<div className="w-full text-center p-5">
						<Loader size={20} />
					</div>
				) : friends!.length == 0 ? (
					<p>No friends found</p>
				) : (
					friends!.map((friend) => (
						<FriendItem
							key={friend.internal_id}
							isFriendSidebar={true}
							friend={friend}
						/>
					))
				)}
			</div>
		</section>
	);
}

export default FriendsSidebar;
