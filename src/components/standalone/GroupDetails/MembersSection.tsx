import MemberItem from "./MemberItem.tsx";
import type { Member } from "../../../lib/types/types.ts";

function MembersSection({ members }: { members: Member[] }) {
	return (
		<div className="text-white xl:col-span-4 space-y-6">
			<div className="flex items-center justify-between mb-3">
				<h3 className="text-xl font-headline font-bold">Members</h3>
				<button className="p-1 text-gray-400 hover:text-white transition-colors">
					<span className="material-symbols-outlined">
						person_add
					</span>
				</button>
			</div>
			<div className="glass-card bg-white/5 border border-white/8 rounded-2xl overflow-hidden divide-y divide-white/8">
				{members.map((member) => (
					<MemberItem member={member}  />
				))}
			</div>
		</div>
	);
}

export default MembersSection;
