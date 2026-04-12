import TransactionItem from "./TransactionItem.tsx";
import { useGetGroupBalances } from "../../../lib/hooks/balance.hooks.ts";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { useEffect } from "react";
import { toast } from "../../shared/CustomToast.tsx";
import { useQueryClient } from "@tanstack/react-query";
import type { GroupData } from "../../../lib/types/types.ts";

function TransactionCard({ isFetching }: { isFetching: boolean }) {
	const { groupId: preParsedGroupId } = useParams();
	const queryClient = useQueryClient();
	const result = z.uuid().safeParse(preParsedGroupId);
	const groupId = result.data;

	const groupData = queryClient.getQueryData<GroupData>(["group", groupId]);

	const {
		data: balances,
		isLoading: fetchingBalances,
		isError,
	} = useGetGroupBalances(groupId);

	useEffect(() => {
		if (isError)
			toast({ message: "Error fetching balances", success: false });
	}, [isError]);

	if (!result) return null;

	return (
		<div className="text-white glass-card bg-white/5 border border-white/8 rounded-2xl p-6 flex flex-col justify-between">
			<h3 className="font-headline font-semibold text-sm text-gray-400 uppercase tracking-widest mb-4">
				Balances
			</h3>
			<div className="space-y-4">
				{isFetching && fetchingBalances
					? Array.from({ length: 3 }).map((_, index) => (
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
					: balances &&
						groupData &&
						balances.map((balance) => (
							<TransactionItem
								key={balance.member_id}
								balance={balance}
								member={groupData.members.find(
									(m) => m.member_id === balance.member_id,
								)!}
							/>
						))}
			</div>
			<button className="mt-6 w-full text-center py-2 text-xs font-bold text-primary border border-primary/30 rounded-lg hover:bg-primary hover:text-white transition-all">
				VIEW ALL TRANSACTIONS
			</button>
		</div>
	);
}

export default TransactionCard;
