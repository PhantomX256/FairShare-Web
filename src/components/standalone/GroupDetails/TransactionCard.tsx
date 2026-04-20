import TransactionItem from "./TransactionItem.tsx";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import type {
	GroupData,
	Member,
	Transaction,
} from "../../../lib/types/types.ts";

function TransactionCard({
	isFetching,
	transactions,
	memberMap,
}: {
	isFetching: boolean;
	transactions?: Transaction[];
	memberMap: Map<number, Member>;
}) {
	const { groupId } = useParams();
	const queryClient = useQueryClient();

	const groupData = queryClient.getQueryData<GroupData>(["group", groupId!]);

	return (
		<div className="text-white glass-card bg-white/5 border border-white/8 rounded-2xl p-6 flex flex-col justify-between">
			<h3 className="font-headline font-semibold text-sm text-gray-400 uppercase tracking-widest mb-4">
				Suggested Transactions
			</h3>
			<div className="space-y-2">
				{isFetching ? (
					Array.from({ length: 3 }).map((_, index) => (
						<div
							key={index}
							className="bg-white/5 border border-white/8 rounded-xl p-3 h-12 flex items-center justify-between"
						>
							<div className="flex flex-1 items-center gap-3">
								<div className="w-8 h-8 bg-white/10 animate-pulse rounded-full" />
								<div className="w-1/2 h-4 bg-white/10 animate-pulse rounded" />
							</div>
							<div className="w-10 h-4 bg-white/10 animate-pulse rounded" />
						</div>
					))
				) : transactions && groupData && transactions.length > 0 ? (
					transactions.map((transaction, index) => {
						const toMember = memberMap.get(transaction.toMemberId);
						const fromMember = memberMap.get(
							transaction.fromMemberId,
						);

						if (!toMember || !fromMember) return null;

						return (
							<TransactionItem
								key={index}
								transaction={transaction}
								toMember={toMember}
								fromMember={fromMember}
							/>
						);
					})
				) : (
					<p className="text-gray-600 text-xs text-center">
						No suggested transactions
					</p>
				)}
			</div>
			<button className="mt-6 w-full text-center py-2 text-xs font-bold text-primary border border-primary/30 rounded-lg hover:bg-primary hover:text-white transition-all">
				VIEW ALL TRANSACTIONS
			</button>
		</div>
	);
}

export default TransactionCard;
