import { DASHBOARD_SIDEBAR_TABS } from "../../lib/constants/constants.ts";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth, usePopup } from "../../lib/hooks/context.hooks.ts";
import Loader from "./Loader.tsx";
import UserProfilePopup from "./UserProfilePopup.tsx";

function Sidebar() {
	const location = useLocation();
	const { logout, isLoggingOut, user } = useAuth();
	const { userProfilePopup, openUserProfilePopup } = usePopup();

	return (
		<div className="bg-background-dark text-slate-900 dark:text-slate-100 antialiased min-h-screen flex overflow-hidden">
			{userProfilePopup !== 0 && <UserProfilePopup />}
			<aside className="w-72 glass-sidebar h-screen flex flex-col p-6 lg:flex shrink-0">
				<div className="flex items-center gap-3 mb-10 px-2">
					<div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white premium-shadow">
						<span className="material-symbols-outlined text-2xl font-bold">
							balance
						</span>
					</div>
					<div>
						<h1 className="text-xl text-white font-extrabold tracking-tight">
							FairShare
						</h1>
						<p className="text-xs text-slate-500 font-medium">
							Split Smarter
						</p>
					</div>
				</div>
				<nav className="space-y-2 flex-1">
					{DASHBOARD_SIDEBAR_TABS.map((tab) => (
						<Link
							className={`flex items-center gap-3 px-4 py-3 rounded-xl ${location.pathname.includes(tab.link) ? "bg-primary/10 text-primary" : "text-slate-400 hover:text-slate-100 hover:bg-white/5"}  font-semibold transition-all`}
							to={tab.link}
							key={tab.name}
						>
							<span className="material-symbols-outlined">
								{tab.icon}
							</span>
							<span>{tab.name}</span>
						</Link>
					))}
				</nav>
				<div className="mt-auto pt-6 space-y-4">
					<button className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all premium-shadow group">
						<span className="material-symbols-outlined group-hover:rotate-12 transition-transform">
							qr_code_scanner
						</span>
						Scan Receipt
					</button>
					<div onClick={() => openUserProfilePopup(user!.internal_id)} className="cursor-pointer p-4 rounded-2xl bg-white/3 border border-white/8 hover:bg-white/8 transition-all duration-100">
						<div className="flex items-center gap-3">
							<img
								className="size-10 rounded-full border border-white/10 object-cover"
								alt="User profile avatar of Alex"
								src={user!.avatar_url}
							/>
							<div className="overflow-hidden">
								<p className="text-white text-sm font-bold truncate">
									{user!.full_name}
								</p>
							</div>
						</div>
					</div>
					<button
						onClick={logout}
						className="cursor-pointer w-full bg-red-500/20 hover:bg-red-500 text-red-500/20 hover:text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all premium-shadow group"
					>
						{isLoggingOut ? (
							<Loader size={20} />
						) : (
							<>
								<span className="material-symbols-outlined transition-transform">
									logout
								</span>
								Logout
							</>
						)}
					</button>
				</div>
			</aside>
			<Outlet />
		</div>
	);
}

export default Sidebar;
