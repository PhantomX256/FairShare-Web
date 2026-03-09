import { useState } from "react";
import { SendRequestSchema } from "../../../lib/validators/friend.validator.ts";
import { useSendFriendRequest } from "../../../lib/hooks/friend.hooks.ts";
import { useAuth } from "../../../lib/hooks/context.hooks.ts";
import Loader from "../../shared/Loader.tsx";

function SendRequestCard() {
	const { user } = useAuth();
	const [value, setValue] = useState("");
	const [inputError, setInputError] = useState("");

	const { mutateAsync: sendFriendRequest, isPending: isSending } =
		useSendFriendRequest();

	async function handleSend() {
		const result = SendRequestSchema.safeParse(value.trim());
		if (!result.success) {
			setInputError("Invalid userId or email");
			return;
		}

		if (result.data === user!.email || result.data === user!.id) {
			setInputError("You cannot send a friend request to yourself");
			return;
		}

		setInputError("");
		try {
			await sendFriendRequest(result.data!);
		} catch {
			// This is here to prevent an uncaught in promise log in the console
			// Fucking retarded I know but it works
		}
	}

	return (
		<div className="flex flex-col items-start justify-center glass-card bg-white/3 border border-white/8 rounded-2xl p-6 shadow-sm">
			<p className="text-slate-100 text-sm font-bold mb-3">
				Add Friend by ID or Email
			</p>
			<div className="flex w-full gap-2">
				<div className="relative flex-1">
					<span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">
						search
					</span>
					<input
						value={value}
						onChange={(e) => setValue(e.target.value)}
						className={`w-full bg-slate-800 ${inputError ? "border-2 border-red-500/50" : "border-none"} rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 text-slate-100 placeholder-slate-500`}
						placeholder="e.g. Oa210as23-.. or name@email.com"
						type="text"
					/>
				</div>
				<button
					onClick={handleSend}
					className="bg-primary/30 flex items-center justify-center w-36 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors whitespace-nowrap"
				>
					{isSending ? <Loader size={20} /> : "Send Request"}
				</button>
			</div>
			{inputError && (
				<p className="text-red-500/70 text-sm font-bold mt-1">
					{inputError}
				</p>
			)}
		</div>
	);
}

export default SendRequestCard;
