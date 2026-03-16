import type { Group } from "../../../lib/types/types.ts";
import {Link} from "react-router-dom";

function GroupCard({ group }: { group: Group }) {
	return (
		<Link
			to={`/groups/${group.id}`}
			className="glass-card border bg-white/3 border-white/8 rounded-2xl p-5 hover:bg-white/5 transition-all cursor-pointer group"
		>
			<div className="flex justify-between mb-4">
				<div
					style={{
						backgroundColor: `${group.color}30`,
						color: group.color,
					}}
					className="size-12 rounded-2xl  flex items-center justify-center"
				>
					<span className="material-symbols-outlined text-2xl">
						{group.icon}
					</span>
				</div>
				<div className="flex -space-x-2">
					{group.avatars!.map((avatar) => (
						<img
							alt="Group member avatar"
							className="size-6 rounded-full border-2 border-background-dark"
							src={avatar}
						/>
					))}
					<div className="size-6 rounded-full bg-slate-800 border-2 border-background-dark flex items-center justify-center text-[10px] text-white">
						+{group.member_count! - group.avatars!.length}
					</div>
				</div>
			</div>
			<h4 className="font-bold text-lg mb-1">{group.name}</h4>
			{/*<div className="flex items-center gap-2 mb-4">*/}
			{/*	<span className="size-2 rounded-full bg-emerald-500"></span>*/}
			{/*	<p className="text-sm text-slate-400">*/}
			{/*		You are owed{" "}*/}
			{/*		<span className="text-slate-100 font-bold">$450.00</span>*/}
			{/*	</p>*/}
			{/*</div>*/}
			{/*<div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">*/}
			{/*	<div className="bg-primary w-1/3 h-full rounded-full"></div>*/}
			{/*</div>*/}
		</Link>
	);
}

export default GroupCard;
