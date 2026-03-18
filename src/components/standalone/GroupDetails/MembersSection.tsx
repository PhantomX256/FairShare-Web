import MemberItem from "./MemberItem.tsx";
import type { Member } from "../../../lib/types/types.ts";

function MembersSection({
	members,
	isFetching,
}: {
	members: Member[] | undefined;
	isFetching: boolean;
}) {
	return (
		<div className="text-white xl:col-span-4 space-y-6">
			<h3 className="mb-3 text-xl font-headline font-bold">Members</h3>
			<div className="glass-card bg-white/5 border border-white/8 rounded-2xl overflow-hidden divide-y divide-white/8">
				{isFetching ? (
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
					members!.map((member) => (
						<MemberItem key={member.member_id} member={member} />
					))
				)}
			</div>
		</div>
	);
}

export default MembersSection;
