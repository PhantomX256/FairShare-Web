import { useGetRecentActivity } from "../../../lib/hooks/expense.hooks.ts";
import { useEffect } from "react";
import { toast } from "../../shared/CustomToast.tsx";
import RecentActivityItem from "./RecentActivityItem.tsx";

function RecentActivitySection() {
	const {
		data: recentActivities,
		isLoading: isRecentLoading,
		isError,
	} = useGetRecentActivity();

	useEffect(() => {
		if (isError)
			toast({
				message: "Error fetching Recent Activity",
				success: false,
			});
	}, [isError]);

	return (
		<section className="pt-4 space-y-6">
			<h2 className="text-xl font-bold">Recent Activity</h2>
			<div className="space-y-3">
				{isRecentLoading ? (
					Array.from({ length: 1 }).map((_, index) => (
						<div
							key={index}
							className="w-full bg-white/5 border border-white/8 h-20 flex rounded-2xl items-center justify-between p-4"
						>
							<div className="flex flex-1 items-center gap-4">
								<div className="w-12 h-12 bg-white/10 animate-pulse rounded-xl" />
								<div className="w-1/2 h-4 bg-white/10 animate-pulse rounded" />
							</div>
							<div className="w-10 h-7 bg-white/10 animate-pulse rounded" />
						</div>
					))
				) : recentActivities!.length > 0 ? (
					recentActivities!.map((recentActivity) => (
						<RecentActivityItem recentActivity={recentActivity} />
					))
				) : (
					<p className="text-gray-500 text-sm text-center">
						No recent activity
					</p>
				)}
			</div>
		</section>
	);
}

export default RecentActivitySection;
