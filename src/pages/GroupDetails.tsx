import GroupBalanceCard from "../components/standalone/GroupDetails/GroupBalanceCard.tsx";
import TransactionCard from "../components/standalone/GroupDetails/TransactionCard.tsx";
import ExpenseItem from "../components/standalone/GroupDetails/ExpenseItem.tsx";
import MembersSection from "../components/standalone/GroupDetails/MembersSection.tsx";
import { useGetGroupData } from "../lib/hooks/group.hooks.ts";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "../components/shared/CustomToast.tsx";
import { useAuth, usePopup } from "../lib/hooks/context.hooks.ts";
import EditGroupPopup from "../components/standalone/Popups/EditGroupPopup.tsx";
import ExpensePopup from "../components/standalone/Popups/ExpensePopup.tsx";
import { useGetExpenses } from "../lib/hooks/expense.hooks.ts";
import { z } from "zod";
import { useGetGroupBalances } from "../lib/hooks/balance.hooks.ts";
import type { Member } from "../lib/types/types.ts";

function GroupDetails() {
	const { groupId: preParsedGroupId } = useParams();
	const result = z.uuid().safeParse(preParsedGroupId);
	const groupId = result.data;

	const { user } = useAuth();
	const {
		editGroupPopup,
		openEditGroupPopup,
		addExpensePopup,
		openAddExpensePopup,
	} = usePopup();
	const {
		data: groupData,
		isLoading: fetchingGroupData,
		isError: fetchError,
	} = useGetGroupData(groupId);

	const {
		data: expenses,
		isLoading: fetchingExpenses,
		isError: expensesError,
	} = useGetExpenses(groupId);

	const {
		data: groupBalances,
		isLoading: fetchingBalances,
		isError: balanceError,
	} = useGetGroupBalances(groupId);

	const memberMap = new Map<number, Member>();
	if (groupData?.members) {
		groupData.members.forEach((m) => {
			memberMap.set(m.member_id, m);
		});
	}

	const userMemberId =
		groupData?.members.find((m) => m.internal_id === user!.internal_id)
			?.member_id ?? 0;

	useEffect(() => {
		if (fetchError)
			toast({ message: "Failed to fetch group details", success: false });
		if (expensesError)
			toast({ message: "Failed to fetch expenses", success: false });
		if (balanceError)
			toast({ message: "Failed to fetch balances", success: false });
	}, [fetchError, expensesError, balanceError]);

	if (!result.success) return null;

	return (
		<main className="flex-1 flex flex-col max-h-screen">
			{editGroupPopup && <EditGroupPopup />}
			{addExpensePopup && <ExpensePopup />}
			<header className="h-16 border-b border-white/8 flex items-center justify-between px-8 shrink-0 backdrop-blur-md">
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
								onClick={() => openEditGroupPopup(groupId!)}
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
							userBalance={
								groupBalances?.balances.find(
									(b) => b.member_id === userMemberId,
								)?.balance ?? 0
							}
							openAddExpensePopup={() =>
								openAddExpensePopup(groupId ?? "")
							}
						/>
						<TransactionCard
							isFetching={fetchingGroupData && fetchingBalances}
							transactions={groupBalances?.transactions}
							memberMap={memberMap}
						/>
					</section>
					<div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
						<div className="text-white xl:col-span-8 space-y-6">
							<h3 className="text-xl font-headline font-bold">
								All Expenses
							</h3>
							<div className="space-y-3">
								{fetchingExpenses ? (
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
								) : expenses!.length > 0 ? (
									expenses!.map((expense) => (
										<ExpenseItem
											key={expense.internal_id}
											expense={expense}
											paidBy={
												memberMap.get(
													expense.paid_by[0],
												)!
											}
										/>
									))
								) : (
									<p className="text-center text-gray-600 text-md">
										No expenses found
									</p>
								)}
							</div>
						</div>
						<MembersSection
							isFetching={fetchingGroupData && fetchingBalances}
							members={groupData?.members}
							balances={groupBalances?.balances}
						/>
					</div>
				</div>
			</div>
		</main>
	);
}

export default GroupDetails;
