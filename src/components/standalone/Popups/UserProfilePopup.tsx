import { useAuth, usePopup } from "../../../lib/hooks/context.hooks.ts";
import { getMonthAndYear } from "../../../lib/utils/date.utils.ts";
import { useGetFriendData } from "../../../lib/hooks/friend.hooks.ts";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "../../../lib/types/types.ts";
import { useEffect } from "react";
import { toast } from "../../shared/CustomToast.tsx";
import { Link } from "react-router-dom";
import { useGetAllGroups } from "../../../lib/hooks/group.hooks.ts";

function UserProfilePopup() {
	const { userProfilePopup, closeUserProfilePopup } = usePopup();
	const { user } = useAuth();
	const queryClient = useQueryClient();

	const isCurrentUserProfile = userProfilePopup === user!.id;

	const friends = queryClient.getQueryData<User[]>(["friends"])!;

	const {
		data: groups,
		isLoading: groupLoading,
		isError: groupError,
	} = useGetAllGroups();

	const {
		data: friendData,
		isLoading,
		isError,
	} = useGetFriendData(isCurrentUserProfile ? "" : userProfilePopup);

	useEffect(() => {
		if (isError)
			toast({
				message: "Failed to fetch data of friend",
				success: false,
			});
		if (groupError)
			toast({
				message: "Failed to fetch groups",
				success: false,
			});
	}, [isError, groupError]);

	const profile = isCurrentUserProfile
		? user!
		: friends.find((f) => f.id === userProfilePopup)!;

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
					<button
						onClick={closeUserProfilePopup}
						className="size-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
					>
						<span className="material-symbols-outlined">close</span>
					</button>
				</div>
				<div className="px-6 py-4 flex flex-col items-center">
					<div className="relative">
						<div className="size-24 rounded-full border-2 border-primary/50 p-1">
							<img
								className="size-full rounded-full bg-cover bg-center"
								src={profile!.avatar_url}
								alt={profile!.full_name}
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
						{isCurrentUserProfile && (
							<>
								{" "}
								<span className="text-slate-500 text-xs">
									•
								</span>
								<span className="text-slate-400 text-xs">
									Member since
									{" " + getMonthAndYear(user!.created_at)}
								</span>
							</>
						)}
						{!isCurrentUserProfile && !isLoading && friendData && (
							<>
								<span className="text-slate-500 text-xs">
									•
								</span>
								<span className="text-slate-400 text-xs">
									Friends since
									{" " +
										getMonthAndYear(
											friendData.friendsSince,
										)}
								</span>
							</>
						)}
					</div>
				</div>
				{!isCurrentUserProfile && (
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
				)}
				{!isCurrentUserProfile && (
					<div className="px-6 py-2">
						<h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">
							Shared Groups
						</h3>
						<div className="flex flex-wrap gap-2">
							{isLoading && groupLoading
								? Array.from({ length: 3 }).map((_, index) => (
										<div
											key={index}
											className="flex items-center gap-2 bg-white/5 border border-white/8 px-3 py-2 rounded-lg"
										>
											<div className="size-5 rounded-lg bg-white/8 animate-pulse" />
											<div className="w-20 h-4 bg-white/8 animate-pulse rounded-md" />
										</div>
									))
								: groups &&
									friendData &&
									groups
										.filter((g) =>
											friendData.sharedGroupsIds.some(
												(groupId) => g.id === groupId,
											),
										)
										.map((group) => (
											<Link
												key={group.internal_id}
												to={`/groups/${group.id}`}
												onClick={closeUserProfilePopup}
												className="flex items-center gap-2 bg-white/5 hover:bg-white/8 border border-white/8 px-3 py-2 rounded-lg cursor-pointer transition-colors group"
											>
												<span
													style={{
														color: group.color,
													}}
													className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform"
												>
													{group.icon}
												</span>
												<span className="text-sm font-medium text-gray-400 group-hover:text-white">
													{group.name}
												</span>
											</Link>
										))}
						</div>
					</div>
				)}
				<div className="h-1 w-full bg-linear-to-r from-transparent via-primary/50 to-transparent"></div>
			</div>
		</div>
	);
}

export default UserProfilePopup;
