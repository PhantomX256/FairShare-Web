import type { Group } from "../../../lib/types/types.ts";

function GroupCard({ group }: { group: Group }) {
	return (
		<div className="glass-card border bg-white/3 border-white/8 rounded-2xl p-5 hover:bg-white/5 transition-all cursor-pointer group">
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
				<div className="flex -space-x-3">
					<img
						className="size-8 rounded-full border-2 border-background-dark object-cover"
						alt="Friend avatar 3"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIBO1vjqxJ8YmiFpHjg9W8DlQt6IHudWyieI1cIcS_heacsYRTdIjKGDJCluflxzuVT1uaU5lSt-uuFMyyS5_VYvEceAmxQgD7PKu__EZF4uLO1EoVbQhsSHS-LT0jHufPwefLLpVKOq4TrCWpKvaoQ4Rl3gL-VLWmGVCSRg6iBgDv0oYDykTrHJZvThtikWdF6h9v4A-cUntufXYoViXRFp1RgvonaEw7JgdcBCfvmTqJ2vK-dI79XbDlBM5sErOHdM1dIzvmw2s"
					/>
					<img
						className="size-8 rounded-full border-2 border-background-dark object-cover"
						alt="Friend avatar 4"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCYXYqaK6hKuy1GCvatNMiQpSczUg3RWa3iF6jsHMJx_DVSaiqOCwAMiZAjfwVZBVkelRq_kpPlO7b79wu4ny4aKmOXtk1NNY8j6MFYolYKUo7hB6XPZEXwvQ4UvTGs-KngY_HkxABYTDxrCb3F_Plb9rl5nAWLZJBciXXt8ENdh6ZnH_-EpOgyLfm7uExX58AZxq2GyCWTjxEY5q2rvR4m-Bndr8UXqnAEy2sd8w_3nnPyD5hzQeFqL1uBPASnm0UVMap_mYYtUM"
					/>
					<div className="size-8 rounded-full border-2 border-background-dark bg-slate-800 flex items-center justify-center text-[10px] font-bold">
						+3
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
		</div>
	);
}

export default GroupCard;
