import { useAuth, usePopup } from "../../../lib/hooks/context.hooks.ts";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "../../../lib/types/types.ts";
import { getMonthAndYear } from "../../../lib/utils/date.utils.ts";

function UserProfilePopup() {
	const { userProfilePopup, closeUserProfilePopup } = usePopup();
	const { user } = useAuth();
	const queryClient = useQueryClient();

	const friends = queryClient.getQueryData<User[]>(["friends"]);
	const profile: User | undefined =
		user!.internal_id === userProfilePopup
			? user!
			: friends!.find((f) => f.internal_id === userProfilePopup);

	return (
		<div className="fixed top-0 left-0 flex items-center justify-center backdrop-blur-sm h-screen w-screen z-40 bg-black/30">
			<div className="relative z-10 w-full max-w-lg glass-panel rounded-xl overflow-hidden shadow-2xl">
				<div className="flex justify-between items-center px-6 pt-6 pb-2">
					<div className="flex items-center gap-2 text-primary">
						<span className="material-symbols-outlined text-2xl">
							account_circle
						</span>
						<span className="text-sm font-semibold tracking-wider uppercase opacity-70">
							User Profile
						</span>
					</div>
					<button onClick={closeUserProfilePopup} className="size-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
						<span className="material-symbols-outlined">close</span>
					</button>
				</div>
				<div className="px-6 py-4 flex flex-col items-center">
					<div className="relative">
						<div className="size-24 rounded-full border-2 border-primary/50 p-1">
							<img
								className="size-full rounded-full bg-cover bg-center"
								src={profile!.avatar_url}
								alt="Portrait of Sarah Jenkins smiling"
							/>
						</div>
					</div>
					<h2 className="mt-4 text-2xl font-bold tracking-tight text-white">
						{profile!.full_name}
					</h2>
					<div className="flex items-center gap-2 mt-1">
						<span className="text-primary font-medium text-sm">
							{profile!.email}
						</span>
						<span className="text-slate-500 text-xs">•</span>
						<span className="text-slate-400 text-xs">
							Member since{" " + getMonthAndYear(user!.created_at)}
						</span>
					</div>
				</div>
				<div className="px-6 py-2">
					<div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center justify-between">
						<div>
							<p className="text-slate-400 text-[10px] font-medium uppercase tracking-wider">
								Current Balance
							</p>
							<p className="text-lg font-bold text-white mt-1">
								Settled up
							</p>
						</div>
						<div className="size-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
							<span className="material-symbols-outlined text-2xl">
								payments
							</span>
						</div>
					</div>
				</div>
				<div className="px-6 py-4 flex gap-3">
					<button className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/20">
						<span className="material-symbols-outlined text-xl">
							check_circle
						</span>
						Settle Up
					</button>
				</div>
				<div className="px-6 py-2">
					<h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">
						Shared Groups
					</h3>
					<div className="flex flex-wrap gap-2">
						<div className="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-800 border border-white/5 px-3 py-2 rounded-lg cursor-pointer transition-colors group">
							<span className="material-symbols-outlined text-primary text-lg group-hover:scale-110 transition-transform">
								home
							</span>
							<span className="text-sm font-medium">
								Apartment 4B
							</span>
						</div>
						<div className="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-800 border border-white/5 px-3 py-2 rounded-lg cursor-pointer transition-colors group">
							<span className="material-symbols-outlined text-primary text-lg group-hover:scale-110 transition-transform">
								flight
							</span>
							<span className="text-sm font-medium">
								Trip to Japan
							</span>
						</div>
					</div>
				</div>
				{/*<div className="px-6 py-4 pb-8">*/}
				{/*	<div className="flex items-center justify-between mb-3">*/}
				{/*		<h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">*/}
				{/*			Recent Activity*/}
				{/*		</h3>*/}
				{/*		<button className="text-primary text-xs font-bold hover:underline">*/}
				{/*			View All*/}
				{/*		</button>*/}
				{/*	</div>*/}
				{/*	<div className="space-y-3">*/}
				{/*		<div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">*/}
				{/*			<div className="flex items-center gap-3">*/}
				{/*				<div className="size-9 rounded-lg bg-orange-500/20 text-orange-500 flex items-center justify-center">*/}
				{/*					<span className="material-symbols-outlined text-xl">*/}
				{/*						restaurant*/}
				{/*					</span>*/}
				{/*				</div>*/}
				{/*				<div>*/}
				{/*					<p className="text-sm font-semibold text-white">*/}
				{/*						Sushi Dinner*/}
				{/*					</p>*/}
				{/*					<p className="text-[10px] text-slate-500">*/}
				{/*						Oct 14, 2023 • Trip to Japan*/}
				{/*					</p>*/}
				{/*				</div>*/}
				{/*			</div>*/}
				{/*			<div className="text-right">*/}
				{/*				<p className="text-sm font-bold text-orange-400">*/}
				{/*					+$42.50*/}
				{/*				</p>*/}
				{/*				<p className="text-[10px] text-slate-500 uppercase">*/}
				{/*					You paid*/}
				{/*				</p>*/}
				{/*			</div>*/}
				{/*		</div>*/}
				{/*		<div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">*/}
				{/*			<div className="flex items-center gap-3">*/}
				{/*				<div className="size-9 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center">*/}
				{/*					<span className="material-symbols-outlined text-xl">*/}
				{/*						bolt*/}
				{/*					</span>*/}
				{/*				</div>*/}
				{/*				<div>*/}
				{/*					<p className="text-sm font-semibold text-white">*/}
				{/*						Electricity Bill*/}
				{/*					</p>*/}
				{/*					<p className="text-[10px] text-slate-500">*/}
				{/*						Oct 02, 2023 • Apartment 4B*/}
				{/*					</p>*/}
				{/*				</div>*/}
				{/*			</div>*/}
				{/*			<div className="text-right">*/}
				{/*				<p className="text-sm font-bold text-slate-300">*/}
				{/*					$120.00*/}
				{/*				</p>*/}
				{/*				<p className="text-[10px] text-slate-500 uppercase">*/}
				{/*					Sarah paid*/}
				{/*				</p>*/}
				{/*			</div>*/}
				{/*		</div>*/}
				{/*	</div>*/}
				{/*</div>*/}
				<div className="h-1 w-full bg-linear-to-r from-transparent via-primary/50 to-transparent"></div>
			</div>
		</div>
	);
}

export default UserProfilePopup;
