import RequestItem from "./RequestItem.tsx";
import { useGetAllReceivedFriendRequests, useGetAllSentFriendRequests } from "../../../lib/hooks/friend.hooks.ts";
import { useEffect, useState } from "react";
import { useToast } from "../../../lib/hooks/context.hooks.ts";
import Loader from "../../shared/Loader.tsx";

function FriendRequestSection() {
	const [selectedTab, setSelectedTab] = useState("Incoming");

	const {
		data: receivedFriendRequests,
		isFetching: fetchingReceivedRequests,
		isError: isReceivedError,
	} = useGetAllReceivedFriendRequests();

	const {
		data: sentFriendRequests,
		isFetching: fetchingSentRequests,
		isError: isSentError
	} = useGetAllSentFriendRequests(selectedTab === "Outgoing");

	const { toast } = useToast();

	useEffect(() => {
		if (isReceivedError)
			toast("Error retrieving incoming requests", false);
		if (isSentError)
			toast("Error retrieving outgoing requests", false);
	}, [isReceivedError, isSentError, toast]);

	return (
		<section className="space-y-4 text-white">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-bold">Friend Requests</h3>
				<div className="flex items-center bg-card-dark p-1 rounded-xl">
					<button
						onClick={() => setSelectedTab("Incoming")}
						className={`px-4 py-1.5 text-xs font-bold rounded-lg ${selectedTab === "Incoming" ? "bg-slate-800" : "text-slate-500"} hover:bg-slate-800 transition-all duration-300 shadow-sm`}
					>
						Incoming{" "}
						{!fetchingReceivedRequests &&
							receivedFriendRequests &&
							`(${receivedFriendRequests!.length})`}
					</button>
					<button
						onClick={() => setSelectedTab("Outgoing")}
						className={`px-4 py-1.5 text-xs font-bold rounded-lg ${selectedTab === "Outgoing" ? "bg-slate-800" : "text-slate-500"} hover:bg-slate-800 transition-all duration-300 shadow-sm`}
					>
						Outgoing
					</button>
				</div>
			</div>
			{fetchingReceivedRequests || fetchingSentRequests ? (
				<div className="w-full flex justify-center">
					<Loader size={30} />
				</div>
			) : selectedTab === "Incoming" ? (
				receivedFriendRequests!.length === 0 ? (
					<div className="p-10 text-center text-sm text-slate-500">
						No Incoming Requests
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{receivedFriendRequests!.map((request) => (
							<RequestItem
								key={request.sender.internal_id}
								request={request}
							/>
						))}
					</div>
				)
			) : sentFriendRequests!.length === 0 ? (
				<div className="p-10 text-center text-sm text-slate-500">
					No Outgoing Requests
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{sentFriendRequests!.map((request) => (
						<RequestItem
							key={request.receiver.internal_id}
							request={request}
							incomingFlag={false}
						/>
					))}
				</div>
			)}
		</section>
	);
}

export default FriendRequestSection;
