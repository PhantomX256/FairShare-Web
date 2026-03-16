import GroupCard from "./GroupCard.tsx";
import RecentActivitySection from "./RecentActivitySection.tsx";
import { Link } from "react-router-dom";
import { usePopup } from "../../../lib/hooks/context.hooks.ts";
import { useGetAllGroups } from "../../../lib/hooks/group.hooks.ts";
import { useEffect } from "react";
import Loader from "../../shared/Loader.tsx";
import { toast } from "../../shared/CustomToast.tsx";

function GroupsSection() {
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
		<section className="xl:col-span-2 text-white space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-bold">Active Groups</h2>
				<Link
					to="/groups"
					className="text-primary text-sm font-bold hover:underline"
				>
					View All
				</Link>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{fetchingGroups ? (
					<div className="flex items-center justify-center">
						<Loader size={30} />
					</div>
				) : (
					groups!.map((group) => (
						<GroupCard key={group.id} group={group} />
					))
				)}
				<div
					onClick={openCreateGroupPopup}
					className="border-2 border-dashed border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-all cursor-pointer group"
				>
					<div className="size-10 rounded-full bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
						<span className="material-symbols-outlined">add</span>
					</div>
					<p className="text-sm font-bold text-slate-500">
						Create New Group
					</p>
				</div>
			</div>
			<RecentActivitySection />
		</section>
	);
}

export default GroupsSection;
