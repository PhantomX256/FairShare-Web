import { useGetAllFriends } from "../../../lib/hooks/friend.hooks.ts";
import FriendItem from "../Friends/FriendItem.tsx";
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
					<>
						{Array.from({ length: 2 }).map((_, index) => (
							<div
								key={index}
								className="flex items-center gap-4 p-4"
							>
								<div className="w-10 h-10 rounded-full bg-white/10 animate-pulse"></div>
								<div className="h-4 bg-white/10 rounded w-1/3 animate-pulse"></div>
							</div>
						))}
					</>
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
