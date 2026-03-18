import { GROUP_ICONS } from "../../lib/constants/constants.ts";

function IconSelect({
	selectedIcon,
	setIcon,
}: {
	selectedIcon: string;
	setIcon: (icon: string) => void;
}) {
	return (
		<div>
			<label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 px-1">
				Choose Icon
			</label>
			<div className="grid grid-cols-4 gap-3">
				{GROUP_ICONS.map((icon) => (
					<button
						onClick={() => setIcon(icon)}
						key={icon}
						className={`aspect-square flex items-center justify-center rounded-xl ${icon === selectedIcon ? "bg-primary text-white hover:bg-blue-600" : "bg-white/5 text-slate-400 hover:bg-white/10"} border border-white/5 transition-colors`}
					>
						<span className="material-symbols-outlined">
							{icon}
						</span>
					</button>
				))}
			</div>
		</div>
	);
}

export default IconSelect;
