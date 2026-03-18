import GroupCard from "../components/standalone/Groups/GroupCard.tsx";
import { useGetAllGroups } from "../lib/hooks/group.hooks.ts";
import { useEffect } from "react";
import { usePopup } from "../lib/hooks/context.hooks.ts";
import { toast } from "../components/shared/CustomToast.tsx";

function Groups() {
	const {
		data: groups,
		isFetching: fetchingGroups,
		isError: groupError,
	} = useGetAllGroups();
	const { openCreateGroupPopup } = usePopup();

	useEffect(() => {
		if (groupError)
			toast({ message: "Error fetching groups", success: false });
	}, [groupError]);

	return (
		<main className="min-h-screen w-full text-white">
			<header className="text-white h-16 border-b border-white/8 flex items-center justify-between px-8 py-4 sticky top-0  backdrop-blur-md z-10">
				<div className="flex items-center gap-2">
					<h2 className="text-xl font-bold tracking-tight">
						Your Groups
					</h2>
				</div>
				<div className="flex items-center gap-6">
					<div className="relative">
						<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
							search
						</span>
						<input
							className="pl-10 pr-4 py-2 bg-slate-800 border-none rounded-lg text-sm focus:ring-1 focus:ring-primary w-64"
							placeholder="Search groups..."
							type="text"
						/>
					</div>
					<div className="flex items-center gap-3">
						<button className="p-2 flex items-center justify-center rounded-lg bg-white/5 text-slate-300 hover:bg-white/8 transition-all duration-100">
							<span className="material-symbols-outlined text-xl">
								notifications
							</span>
						</button>
					</div>
				</div>
			</header>
			<div className="p-8 max-w-7xl mx-auto">
				<div className="flex items-end justify-between mb-8">
					<div>
						<h1 className="text-3xl font-black tracking-tight mb-2">
							My Circles
						</h1>
						<p className="text-slate-400">
							Manage expenses and shared budgets with friends and
							family.
						</p>
					</div>
					<div className="flex gap-2 bg-primary/5 p-1 rounded-xl">
						<button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold shadow-sm">
							All Groups
						</button>
						<button className="px-4 py-2 text-slate-400 text-sm font-semibold">
							Travel
						</button>
						<button className="px-4 py-2 text-slate-400 text-sm font-semibold">
							Home
						</button>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					<div
						onClick={openCreateGroupPopup}
						className="group flex flex-col justify-center items-center gap-4 p-6 border-2 border-dashed border-white/8 rounded-2xl hover:bg-white/8  transition-all cursor-pointer min-h-70"
					>
						<div className="size-14 rounded-full bg-white/5 text-slate-500 flex items-center justify-center group-hover:text-primary transition-all">
							<span className="material-symbols-outlined text-3xl">
								add
							</span>
						</div>
						<div className="text-center">
							<p className="font-bold text-lg">
								Create New Group
							</p>
							<p className="text-sm text-slate-500 dark:text-slate-400">
								Start splitting bills
							</p>
						</div>
					</div>
					{fetchingGroups ? (
						<div className="h-full w-full flex items-center justify-center bg-white/10 rounded-2xl animate-pulse" />
					) : (
						groups!.map((group) => (
							<GroupCard key={group.internal_id} group={group} />
						))
					)}
				</div>
			</div>
		</main>
	);
}

export default Groups;
