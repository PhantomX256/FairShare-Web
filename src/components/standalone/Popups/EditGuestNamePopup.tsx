import { usePopup } from "../../../lib/hooks/context.hooks.ts";
import { useState } from "react";
import { GuestName } from "../../../lib/validators/group.validator.ts";
import { toast } from "../../shared/CustomToast.tsx";
import { useEditGuestName } from "../../../lib/hooks/group.hooks.ts";
import { useParams } from "react-router-dom";

function EditGuestNamePopup() {
	const { editGuestNamePopup, closeEditGuestNamePopup } = usePopup();
	const [guestName, setGuestName] = useState(editGuestNamePopup.name);
	const { groupId } = useParams();
	const { mutateAsync: editGuestName, isPending: editingGuestName } =
		useEditGuestName(groupId!);

	async function handleSubmit() {
		if (guestName.trim() === editGuestNamePopup.name) return;
		const result = GuestName.safeParse(guestName.trim());
		if (!result.success) {
			toast({ message: "Invalid guest name", success: false });
		} else {
			await editGuestName({
				memberId: editGuestNamePopup.memberId,
				name: guestName,
			});
		}
	}

	return (
		<div className="fixed top-0 left-0 flex items-center justify-center backdrop-blur-sm h-screen w-screen z-40 bg-black/30">
			<div className="glass-panel w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
				<div className="px-5 py-3 flex items-center justify-between border-b border-white/5">
					<h2 className="text-xl font-extrabold tracking-tight text-white">
						Edit Guest Name
					</h2>
					<button
						onClick={closeEditGuestNamePopup}
						className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"
					>
						<span className="material-symbols-outlined text-slate-400">
							close
						</span>
					</button>
				</div>
				<div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
					<p className="mb-2 px-3 text-lg">Guest Name</p>
					<div className="relative">
						<input
							value={guestName}
							onChange={(e) => setGuestName(e.target.value)}
							className="bg-white/5 border-none rounded-xl py-1.5 px-4 text-lg text-gray-400 focus:ring-1 focus:ring-brand-primary w-full"
							placeholder="Enter a name"
							type="text"
						/>
					</div>
				</div>
				<div className="p-5 bg-white/5 border-t border-white/5">
					<button
						onClick={handleSubmit}
						className="w-full bg-primary hover:bg-blue-600 text-white py-5 rounded-2xl font-black text-md shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
					>
						<>
							<span className="material-symbols-outlined">
								group_add
							</span>
							{editingGuestName ? "Editing..." : "Edit Name"}
						</>
					</button>
				</div>
			</div>
		</div>
	);
}

export default EditGuestNamePopup;
