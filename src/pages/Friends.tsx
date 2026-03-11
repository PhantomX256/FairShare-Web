import TopNav from "../components/standalone/Dashboard/TopNav.tsx";
import ShareIDCard from "../components/standalone/Friends/ShareIDCard.tsx";
import SendRequestCard from "../components/standalone/Friends/SendRequestCard.tsx";
import FriendRequestSection from "../components/standalone/Friends/FriendRequestSection.tsx";
import FriendsSection from "../components/standalone/Friends/FriendsSection.tsx";

function Friends() {
	return (
		<main className="flex-1 overflow-y-auto h-screen relative">
			<TopNav />
			<div className="px-8 pb-12 space-y-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<ShareIDCard />
					<SendRequestCard />
				</div>
				<FriendRequestSection />
				<FriendsSection />
			</div>
		</main>
	);
}

export default Friends;
