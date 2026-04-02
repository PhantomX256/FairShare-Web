import GroupBalanceCard from "../components/standalone/GroupDetails/GroupBalanceCard.tsx";
import SettlementsCard from "../components/standalone/GroupDetails/SettlementsCard.tsx";
import ExpenseItem from "../components/standalone/GroupDetails/ExpenseItem.tsx";
import MembersSection from "../components/standalone/GroupDetails/MembersSection.tsx";
import { useGetGroupData } from "../lib/hooks/group.hooks.ts";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "../components/shared/CustomToast.tsx";
import { useAuth, usePopup } from "../lib/hooks/context.hooks.ts";
import EditGroupPopup from "../components/standalone/Popups/EditGroupPopup.tsx";
import AddExpensePopup from "../components/standalone/Popups/AddExpensePopup.tsx";

function GroupDetails() {
	const { groupId } = useParams();
	const { user } = useAuth();
	const { editGroupPopup, openEditGroupPopup, addExpensePopup } = usePopup();
	const {
		data: groupData,
		isLoading: fetchingGroupData,
		isError: fetchError,
	} = useGetGroupData(groupId!);

	useEffect(() => {
		if (fetchError)
			toast({ message: "Failed to fetch group details", success: false });
	}, [fetchError]);

	if (!groupId || !groupData) return null;

	return (
		<main className="flex-1 flex flex-col max-h-screen">
			{editGroupPopup && <EditGroupPopup />}
			{addExpensePopup && <AddExpensePopup />}
			<header className="h-16 border-b border-brand-border flex items-center justify-between px-8 shrink-0 backdrop-blur-md">
				<h2 className="text-white font-headline font-semibold text-lg">
					Group Details
				</h2>
				<div className="flex items-center gap-4">
					<div className="relative">
						<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
							search
						</span>
						<input
							className="bg-white/5 border-none rounded-full py-1.5 pl-10 pr-4 text-sm text-gray-500 focus:ring-1 focus:ring-brand-primary w-64"
							placeholder="Search transactions..."
							type="text"
						/>
					</div>
					<button className="text-gray-400 hover:text-white transition-colors">
						<span className="material-symbols-outlined">
							notifications
						</span>
					</button>
					{!fetchingGroupData &&
						groupData!.group.created_by === user!.internal_id && (
							<button
								className="text-gray-400 hover:text-white transition-colors"
								onClick={() => openEditGroupPopup(groupId)}
							>
								<span className="material-symbols-outlined">
									settings
								</span>
							</button>
						)}
				</div>
			</header>
			<div className="flex-1 overflow-y-auto p-8">
				<div className="max-w-6xl mx-auto space-y-8">
					<section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						<GroupBalanceCard
							isFetching={fetchingGroupData}
							group={groupData?.group}
						/>
						<SettlementsCard isFetching={fetchingGroupData} />
					</section>
					<div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
						<div className="text-white xl:col-span-8 space-y-6">
							<h3 className="text-xl font-headline font-bold">
								All Expenses
							</h3>
							<div className="space-y-3">
								{fetchingGroupData ? (
									<>
										{Array.from({ length: 3 }).map(
											(_, index) => (
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
											),
										)}
									</>
								) : (
									<ExpenseItem />
								)}
							</div>
						</div>
						<MembersSection
							isFetching={fetchingGroupData}
							members={groupData?.members}
						/>
					</div>
				</div>
			</div>
		</main>
	);
}

export default GroupDetails;
