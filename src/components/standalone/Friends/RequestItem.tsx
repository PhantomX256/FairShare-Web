import type {
	ReceivedFriendRequest,
	SentFriendRequest,
} from "../../../lib/types/types.ts";
import { getRelativeTime } from "../../../lib/utils/date.utils.ts";
import { useModifyFriendRequest } from "../../../lib/hooks/friend.hooks.ts";
import Loader from "../../shared/Loader.tsx";

function RequestItem({
	request,
	incomingFlag = true,
}: {
	request: ReceivedFriendRequest | SentFriendRequest;
	incomingFlag?: boolean;
}) {
	const person = incomingFlag
		? (request as ReceivedFriendRequest).sender
		: (request as SentFriendRequest).receiver;

	const { mutateAsync: modifyFriendRequest, isPending: isModifying } =
		useModifyFriendRequest(incomingFlag, person);

	async function handleAccept() {
		const selectedRequest = request as ReceivedFriendRequest;
		await modifyFriendRequest({
			senderId: selectedRequest.sender.internal_id,
			receiverId: selectedRequest.receiver_id,
			accept: true,
		});
	}

	async function handleRemove() {
		if (incomingFlag) {
			const selectedRequest = request as ReceivedFriendRequest;
			await modifyFriendRequest({
				senderId: selectedRequest.sender.internal_id,
				receiverId: selectedRequest.receiver_id,
				accept: false
			});
		} else {
			const selectedRequest = request as SentFriendRequest;
			await modifyFriendRequest({
				senderId: selectedRequest.sender_id,
				receiverId: selectedRequest.receiver.internal_id,
				accept: false,
			});
		}
	}
	return (
		<div className="glass-card bg-white/3 border border-white/8 p-4 rounded-2xl flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div className="size-10 rounded-full bg-slate-800 flex items-center justify-center">
					<img
						className="w-full h-full object-cover rounded-full"
						alt={`Portrait of ${person.full_name}`}
						src={person.avatar_url}
					/>
				</div>
				<div>
					<p className="text-sm font-bold">{person.full_name}</p>
					<p className="text-xs text-slate-500">
						{`${getRelativeTime(request.created_at)} ago`}
					</p>
				</div>
			</div>
			<div className="flex gap-2">
				{isModifying ? (
					<Loader size={30} />
				) : (
					<>
						{incomingFlag && (
							<button
								onClick={handleAccept}
								className="flex items-center justify-center p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors"
							>
								<span className="material-symbols-outlined text-xl">
									check
								</span>
							</button>
						)}
						<button
							onClick={handleRemove}
							className="flex items-center justify-center p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
						>
							<span className="material-symbols-outlined text-xl">
								close
							</span>
						</button>
					</>
				)}
			</div>
		</div>
	);
}

export default RequestItem;
