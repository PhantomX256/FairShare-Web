import ShareIDCard from "../components/standalone/Friends/ShareIDCard.tsx";
import SendRequestCard from "../components/standalone/Friends/SendRequestCard.tsx";
import FriendRequestSection from "../components/standalone/Friends/FriendRequestSection.tsx";
import FriendsSection from "../components/standalone/Friends/FriendsSection.tsx";

function Friends() {
	return (
		<main className="flex-1 overflow-y-auto h-screen relative text-white">
			<header className="sticky top-0 z-10 flex items-center justify-between px-8 py-4  backdrop-blur-md border-b border-white/8">
				<h2 className="text-xl font-bold">Your Friends</h2>
				<div className="flex items-center gap-3">
					<button className="p-2 flex items-center justify-center rounded-lg bg-white/5 text-slate-300 hover:bg-white/8 transition-all duration-100">
						<span className="material-symbols-outlined text-xl">
							notifications
						</span>
					</button>
				</div>
			</header>
			<div className="px-8 py-12 space-y-8">
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
