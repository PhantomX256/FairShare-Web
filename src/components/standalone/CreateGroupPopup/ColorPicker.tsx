import { GROUP_COLORS } from "../../../lib/constants/constants.ts";

function ColorPicker({
	selectedColor,
	setColor,
}: {
	selectedColor: string;
	setColor: (color: string) => void;
}) {
	return (
		<div>
			<label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 px-1">
				Theme Color
			</label>
			<div className="grid grid-cols-4 gap-3">
				{GROUP_COLORS.map((color) => (
					<button
						type="button"
						onClick={() => setColor(color)}
						key={color}
						style={{ backgroundColor: `${color}` }}
						className={`aspect-square rounded-xl transition ${
							selectedColor === color
								? "ring-2 ring-offset-2 ring-primary ring-offset-[#121214]"
								: ""
						}`}
					/>
				))}
				<button className="aspect-square rounded-xl border-2 border-dashed border-white/20 flex items-center justify-center bg-linear-to-br from-white/5 to-white/10 hover:bg-white/10 transition-colors group">
					<span className="material-symbols-outlined text-slate-400 group-hover:text-white">
						add
					</span>
				</button>
			</div>
		</div>
	);
}

export default ColorPicker;
