import MemberItem from "./MemberItem.tsx";
import type { Member } from "../../../lib/types/types.ts";
import { useAuth, usePopup } from "../../../lib/hooks/context.hooks.ts";
import EditGuestNamePopup from "../Popups/EditGuestNamePopup.tsx";
import { useGetGroupBalances } from "../../../lib/hooks/balance.hooks.ts";
import { useEffect } from "react";
import { toast } from "../../shared/CustomToast.tsx";
import { useParams } from "react-router-dom";

function MembersSection({
	members,
	isFetching,
}: {
	members: Member[] | undefined;
	isFetching: boolean;
}) {
	const { editGuestNamePopup, openEditGuestNamePopup } = usePopup();
	const { groupId } = useParams();
	const { user } = useAuth();

	const {
		data: groupBalances,
		isLoading: fetchingBalances,
		isError: balanceError,
	} = useGetGroupBalances(groupId);

	const balances = groupBalances?.balances;

	useEffect(() => {
		if (balanceError)
			toast({ message: "Failed to fetch balances", success: false });
	}, [balanceError]);

	return (
		<div className="text-white xl:col-span-4 space-y-6">
			{editGuestNamePopup.memberId !== 0 && <EditGuestNamePopup />}
			<h3 className="mb-3 text-xl font-headline font-bold">Members</h3>
			<div className="glass-card bg-white/5 border border-white/8 rounded-2xl overflow-hidden divide-y divide-white/8">
				{isFetching && fetchingBalances ? (
					<>
						{Array.from({ length: 2 }).map((_, index) => (
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
						))}
					</>
				) : (
					balances &&
					members!.map((member) => (
						<MemberItem
							onClick={
								member.internal_id
									? undefined
									: () =>
											openEditGuestNamePopup(
												member.member_id,
												member.name,
											)
							}
							key={member.member_id}
							isCurrentUser={
								user!.internal_id === member.internal_id
							}
							isGuest={!member.user_id}
							member={member}
							balance={
								balances.find(
									(b) => b.member_id === member.member_id,
								)!.balance
							}
						/>
					))
				)}
			</div>
		</div>
	);
}

export default MembersSection;
