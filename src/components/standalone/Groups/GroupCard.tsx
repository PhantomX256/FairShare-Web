import type { Group } from "../../../lib/types/types.ts";
import { Link } from "react-router-dom";

function GroupCard({ group }: { group: Group }) {
	return (
		<Link
			to={`/groups/${group.id}`}
			className="glass-card bg-white/3 group flex flex-col rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all border border-white/8 h-full"
		>
			<div
				style={{
					backgroundImage: `radial-gradient(circle at 20% 20%, ${group.color}50 0%, transparent 40%), radial-gradient(circle at 80% 80%, ${group.color}50 0%, transparent 40%)`,
				}}
				className="h-full relative flex items-center justify-center bg-white/3"
			>
				<span
					style={{ color: group.color }}
					className="material-symbols-outlined text-[100px]  group-hover:scale-110 transition-transform duration-500"
				>
					{group.icon}
				</span>
				<div className="absolute bottom-4 left-4 flex items-center gap-2">
					<span
						style={{ backgroundColor: group.color }}
						className=" px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider"
					>
						Home
					</span>
				</div>
			</div>
			<div className="p-5 flex flex-col flex-1">
				<div className="flex justify-between items-start mb-4">
					<div>
						<h3 className="font-bold text-lg">{group.name}</h3>
						<p className="text-xs text-slate-500">
							{group.member_count!} members • Shared Bills
						</p>
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
				<div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-start">
					<div className="flex flex-col">
						<span className="text-sm text-slate-500">Your</span>
						<span className="text-sm text-slate-500">balance</span>
					</div>

					<div className="flex flex-col items-end">
						<span className="text-sm font-bold text-rose-500">
							You owe
						</span>
						<span className="text-sm font-bold text-rose-500">
							$120.00
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default GroupCard;
