import ExpenseDetailsHeader from "../components/standalone/ExpenseDetails/ExpenseDetailsHeader.tsx";
import ExpenseHeaderCard from "../components/standalone/ExpenseDetails/ExpenseHeaderCard.tsx";
import ExpenseMemberItem from "../components/standalone/ExpenseDetails/ExpenseMemberItem.tsx";
import PayerMemberItem from "../components/standalone/ExpenseDetails/PayerMemberItem.tsx";
import { useGetExpenseData } from "../lib/hooks/expense.hooks.ts";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { useEffect } from "react";
import { toast } from "../components/shared/CustomToast.tsx";
import { displaySplitMode } from "../lib/utils/expense.utils.ts";

function ExpenseDetails() {
	const { expenseId: preParsedExpenseId } = useParams();
	const result = z.uuid().safeParse(preParsedExpenseId);
	const expenseId = result.data;

	const {
		data: expenseData,
		isLoading: isExpenseLoading,
		isError: expenseError,
	} = useGetExpenseData(expenseId);

	useEffect(() => {
		if (expenseError)
			toast({ message: "Error fetching expense data", success: false });
	}, [expenseError]);

	if (!result.success) {
		return null;
	}

	return (
		<main className="flex-1 flex flex-col max-h-screen">
			<ExpenseDetailsHeader />
			<div className="flex-1 overflow-y-auto p-8">
				<div className="max-w-6xl mx-auto space-y-8">
					<ExpenseHeaderCard
						isLoading={isExpenseLoading}
						expense={expenseData?.expense}
						group={expenseData?.group}
					/>
					<div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
						<div className="xl:col-span-8 space-y-6">
							<div className="flex items-center justify-between">
								<h3 className="text-xl text-white font-bold">
									Split Details
								</h3>
								{isExpenseLoading ? (
									<div className="w-20 h-5 bg-white/10 animate-pulse" />
								) : (
									<div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-brand-border">
										<span className="text-[10px] font-bold text-primary uppercase tracking-widest">
											{expenseData!.expense.split_mode
												? displaySplitMode(
														expenseData!.expense
															.split_mode,
													)
												: "Transaction"}
										</span>
									</div>
								)}
							</div>
							<div className="space-y-3">
								{isExpenseLoading
									? Array.from({ length: 3 }).map(
											(_, index) => (
												<div
													key={index}
													className="flex items-center justify-between p-5 bg-white/5 border border-white/8 rounded-xl"
												>
													<div className="flex flex-1 items-center gap-4">
														<div className="rounded-full size-12 bg-white/10 animate-pulse" />
														<div className="rounded w-1/2 h-5 bg-white/10 animate-pulse" />
													</div>
													<div className="rounded w-10 h-4 bg-white/10 animate-pulse" />
												</div>
											),
										)
									: expenseData!.expenseMembers
											.filter((m) => m.owed_amount > 0)
											.map((expenseMember) => (
												<ExpenseMemberItem
													expenseMember={
														expenseMember
													}
													splitMode={
														expenseData!.expense
															.split_mode
													}
												/>
											))}
							</div>
							{/*<div className="mt-10">*/}
							{/*	<h4 className="text-xs font-black text-on-surface-variant uppercase tracking-[0.2em] mb-4 px-2">Receipt Scan</h4>*/}
							{/*	<div className="glass-card rounded-2xl p-4">*/}
							{/*		<div className="aspect-[16/9] bg-neutral-900 rounded-xl border border-brand-border overflow-hidden relative group">*/}
							{/*			<img alt="Receipt Preview" className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2Or8QAaP4JFlUcuKkGQ1zTKthPLEyMEsqORCu-m6yeDNX535lPkVGxiBkqQcHpg9uTTBgz9sf6qp8VAwCBs6lEgZRJjzF6zmeba76HmC6WtHnXS3VEM7A_U2YzlFwHT2rpL9EgSDU-R3dXxtDoXxNQHQKGBshIXoZi_Grgn6JqLSxJwwDebKy1CS_MY7vg03Wkq4CuR4uqdsh8RV_QUgaeiC6vu9_G6kZFQhkIJpk9tA_sstAiaOtdCPrlQDk-tlprIwz1b-2xYg"/>*/}
							{/*			<div className="absolute inset-0 flex items-center justify-center">*/}
							{/*				<button className="glass-card px-6 py-3 rounded-full flex items-center gap-2 text-sm font-bold active:scale-95 transition-transform">*/}
							{/*					<span className="material-symbols-outlined">zoom_in</span> View Full Receipt*/}
							{/*				</button>*/}
							{/*			</div>*/}
							{/*		</div>*/}
							{/*	</div>*/}
							{/*</div>*/}
						</div>
						<div className="xl:col-span-4 space-y-6">
							<h3 className="text-xl font-bold text-white mb-6">
								Paid By
							</h3>
							<div className="glass-card bg-white/5 border border-white/8 rounded-2xl overflow-hidden divide-y divide-white/8">
								{isExpenseLoading ? (
									<>
										{Array.from({ length: 3 }).map(
											(_, index) => (
												<div
													key={index}
													className="flex items-center justify-between p-4"
												>
													<div className="flex flex-1 items-center gap-4">
														<div className="rounded-full w-10 h-10 bg-white/10 animate-pulse" />
														<div className="rounded w-1/2 h-4 bg-white/10 animate-pulse" />
													</div>
													<div className="rounded w-10 h-4 bg-white/10 animate-pulse" />
												</div>
											),
										)}
									</>
								) : (
									expenseData!.expenseMembers
										.filter((m) => m.paid_amount > 0)
										.map((expenseMember) => (
											<PayerMemberItem
												expenseMember={expenseMember}
											/>
										))
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default ExpenseDetails;
