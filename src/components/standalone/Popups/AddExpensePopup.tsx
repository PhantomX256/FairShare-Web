import { usePopup } from "../../../lib/hooks/context.hooks.ts";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import type { GroupData } from "../../../lib/types/types.ts";
import MemberPicker from "../../shared/MemberPicker.tsx";
import ExpenseMemberPicker from "../../shared/ExpenseMemberPicker.tsx";
import { useAddExpenseForm } from "../../../lib/hooks/expense.hooks.ts";
import { Milli } from "../../../lib/utils/expense.utils.ts";
import ExpenseIconSelect from "../../shared/ExpenseIconSelect.tsx";
import { CurrencyInput } from "react-currency-input-field";

function AddExpensePopup() {
	const { closeAddExpensePopup } = usePopup();
	const { groupId } = useParams();
	const queryClient = useQueryClient();
	const { members } = queryClient.getQueryData<GroupData>([
		"group",
		groupId!,
	])!;
	const {
		form,
		remainingBalance,
		changeTitle,
		changeIcon,
		changeAmount,
		isPayerSelected,
		isMemberInvolved,
		changeNumberOfPayers,
		changeSplitMode,
		changePayer,
		changePayerAmount,
		changeInvolvement,
		addPart,
		removePart,
		changeOwedAmount,
		remainingOwedBalance,
		isAdding,
		submitForm,
	} = useAddExpenseForm();

	return (
		<div className="fixed top-0 left-0 flex items-center justify-center backdrop-blur-sm h-screen w-screen z-40 bg-black/30">
			<div className="glass-panel w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
				<div className="px-5 py-3 flex items-center justify-between border-b border-white/5">
					<h2 className="text-xl font-extrabold tracking-tight text-white">
						Add New Expense
					</h2>
					<button
						onClick={closeAddExpensePopup}
						className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"
					>
						<span className="material-symbols-outlined text-slate-400">
							close
						</span>
					</button>
				</div>
				<div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
					<section className="space-y-6">
						<div>
							<label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 px-1">
								Expense Title
							</label>
							<input
								value={form.title}
								onChange={(e) => changeTitle(e.target.value)}
								className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-600"
								placeholder="e.g. Dinner at John's"
								type="text"
							/>
						</div>
						<div>
							<ExpenseIconSelect
								selectedIcon={form.icon}
								setIcon={changeIcon}
							/>
						</div>
						<div>
							<label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 px-1">
								Amount
							</label>
							<div className="relative flex items-center">
								<span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl">
									$
								</span>
								<CurrencyInput
									className="w-full text-4xl font-bold bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-6 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-600"
									placeholder="0.00"
									value={form.amountString}
									onValueChange={(value) =>
										changeAmount(value)
									}
								/>
							</div>
						</div>
					</section>
					<section className="space-y-6">
						<div className="flex items-center justify-between mb-2">
							<p className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">
								Paid by
							</p>
							<div className="flex items-center justify-between bg-white/5 p-1 rounded-full">
								<button
									onClick={() => changeNumberOfPayers(false)}
									className={`${form.areMultiplePayers ? "text-slate-400 hover:bg-primary/5" : "bg-primary hover:bg-blue-600 text-white"} px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300`}
								>
									Single
								</button>
								<button
									onClick={() => changeNumberOfPayers(true)}
									className={`${form.areMultiplePayers ? "bg-primary hover:bg-blue-600 text-white" : "text-slate-400 hover:bg-primary/5"} px-3 py-1 text-xs font-semibold  rounded-full transition-all duration-300`}
								>
									Multiple
								</button>
							</div>
						</div>
						<div className="bg-white/5 rounded-2xl border border-white/5 divide-y divide-white/5 overflow-hidden mb-1">
							{members.map((member) => (
								<MemberPicker
									key={member.member_id}
									member={member}
									isSelected={isPayerSelected(
										member.member_id,
									)}
									areMultiplePayers={form.areMultiplePayers}
									changePayer={() =>
										changePayer(member.member_id)
									}
									paidAmountString={
										form.paidBy.find(
											(payer) =>
												member.member_id ===
												payer.memberId,
										)?.paidAmountString ?? ""
									}
									changePayerAmount={changePayerAmount}
								/>
							))}
						</div>
						{remainingBalance !== 0 && (
							<p className="text-slate-500 text-end mt-0 text-sm">{`Remaining: $${Milli.formatMilli(remainingBalance)}`}</p>
						)}
					</section>
					<section className="space-y-6">
						<label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 px-1">
							Split mode
						</label>
						<div className="grid grid-cols-3 gap-0 bg-white/5 p-1 rounded-full">
							<button
								onClick={() => changeSplitMode("equally")}
								className={`py-3 ${form.splitMode === "equally" ? "bg-primary hover:bg-blue-600 text-white" : "text-slate-400 hover:bg-primary/5"} rounded-full text-xs font-semibold shadow-sm transition-all duration-300`}
							>
								Equally
							</button>
							<button
								onClick={() => changeSplitMode("parts")}
								className={`py-3 ${form.splitMode === "parts" ? "bg-primary hover:bg-blue-600 text-white" : "text-slate-400 hover:bg-primary/5"} text-xs font-semibold rounded-full transition-all duration-300`}
							>
								By Parts
							</button>
							<button
								onClick={() => changeSplitMode("specific")}
								className={`py-3 ${form.splitMode === "specific" ? "bg-primary hover:bg-blue-600 text-white" : "text-slate-400 hover:bg-primary/5"} text-xs font-semibold rounded-full transition-all duration-300`}
							>
								Specific
							</button>
						</div>
					</section>
					<section className="space-y-6">
						<label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 px-1">
							Split with
						</label>
						<div className="bg-white/5 rounded-2xl border border-white/5 divide-y divide-white/5 overflow-hidden">
							{members.map((member) => {
								const involved = form.membersInvolved.find(
									(m) => m.memberId === member.member_id,
								);

								return (
									<ExpenseMemberPicker
										key={member.member_id}
										member={member}
										isSelected={isMemberInvolved(
											member.member_id,
										)}
										changeInvolvement={() =>
											changeInvolvement(member.member_id)
										}
										owedAmountString={
											involved?.owedAmountString ?? ""
										}
										splitMode={form.splitMode}
										parts={involved?.parts ?? 0}
										addPart={() =>
											addPart(member.member_id)
										}
										removePart={() =>
											removePart(member.member_id)
										}
										changeOwedAmount={changeOwedAmount}
									/>
								);
							})}
						</div>
						{remainingOwedBalance !== 0 && (
							<p className="text-slate-500 text-end mt-0 text-sm">{`Remaining: $${Milli.formatMilli(remainingOwedBalance)}`}</p>
						)}
					</section>
				</div>
				<div className="p-5 bg-white/5 border-t border-white/5">
					<button
						onClick={submitForm}
						className="w-full bg-primary hover:bg-blue-600 text-white py-5 rounded-2xl font-black text-md shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
					>
						<span className="material-symbols-outlined">money</span>
						{isAdding ? "Adding..." : "Add Expense"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default AddExpensePopup;
