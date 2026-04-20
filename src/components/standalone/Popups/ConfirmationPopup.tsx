import { usePopup } from "../../../lib/hooks/context.hooks.ts";
import Loader from "../../shared/Loader.tsx";

function ConfirmationPopup() {
	const { confirmationPopup, closeConfirmationPopup } = usePopup();

	const { question, onYes, onNo, asyncOnYes, asyncOnNo, isPending } =
		confirmationPopup;

	async function handleNo() {
		if (onNo) onNo();
		if (asyncOnNo) await asyncOnNo();
		closeConfirmationPopup();
	}

	async function handleYes() {
		if (onYes) onYes();
		if (asyncOnYes) await asyncOnYes();
		closeConfirmationPopup();
	}

	return (
		<div className="fixed top-0 left-0 flex items-center justify-center backdrop-blur-sm h-screen w-screen z-50 bg-black/30">
			<div className="glass-panel w-full max-w-1/3 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
				<div className="px-5 py-3 flex items-center justify-between border-b border-white/5">
					<h2 className="text-xl font-extrabold tracking-tight text-white">
						Confirm Action
					</h2>
					<button
						onClick={handleNo}
						disabled={isPending}
						className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"
					>
						<span className="material-symbols-outlined text-slate-400">
							close
						</span>
					</button>
				</div>
				<div className="px-5 py-3 text-center">
					<p className="text-gray-400 text-lg">{question}</p>
				</div>
				<div className="mx-5 my-3 flex items-center justify-center gap-10">
					<button
						onClick={handleYes}
						disabled={isPending}
						className="bg-white/5 px-5 w-30 py-2 border flex items-center justify-center border-white/8 text-white rounded-lg hover:bg-white/8 transition"
					>
						{isPending ? <Loader size={25} /> : "Yes"}
					</button>
					<button
						disabled={isPending}
						onClick={handleNo}
						className="bg-white/5 px-5 w-30 py-2 border border-white/8 text-white rounded-lg hover:bg-white/8 transition"
					>
						No
					</button>
				</div>
			</div>
		</div>
	);
}

export default ConfirmationPopup;
