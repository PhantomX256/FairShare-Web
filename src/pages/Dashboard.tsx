import BalanceSection from "../components/standalone/Dashboard/BalanceSection.tsx";
import GroupsSection from "../components/standalone/Dashboard/GroupsSection.tsx";
import FriendsSidebar from "../components/standalone/Dashboard/FriendsSidebar.tsx";
import TopNav from "../components/standalone/Dashboard/TopNav.tsx";

function Dashboard() {
	return (
		<main className="flex-1 overflow-y-auto h-screen relative">
			<TopNav />
			<div className="px-8 pb-12 space-y-8">
				<BalanceSection />
				<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
					<GroupsSection />
					<FriendsSidebar />
				</div>
			</div>
		</main>
	);
}

export default Dashboard;
