import IconSelect from "../../shared/IconSelect.tsx";
import ColorPicker from "../../shared/ColorPicker.tsx";
import Loader from "../../shared/Loader.tsx";
import FriendPicker from "../../shared/FriendPicker.tsx";
import Token from "../../shared/Token.tsx";
import { useAuth, usePopup } from "../../../lib/hooks/context.hooks.ts";
import { useEditGroupForm } from "../../../lib/hooks/group.hooks.ts";
import { useQueryClient } from "@tanstack/react-query";
import type { GroupData } from "../../../lib/types/types.ts";
import { useGetAllFriends } from "../../../lib/hooks/friend.hooks.ts";
import { useEffect, useMemo, useState } from "react";
import { toast } from "../../shared/CustomToast.tsx";

function EditGroupPopup() {
	const { user } = useAuth();
	const { editGroupPopup, closeEditGroupPopup } = usePopup();
	const [friendSearch, setFriendSearch] = useState("");
	const [guestName, setGuestName] = useState("");
	const {
		data: friends,
		isFetching: fetchingFriends,
		isError: friendError,
	} = useGetAllFriends();

	const queryClient = useQueryClient();
	const groupData = queryClient.getQueryData<GroupData>([
		"group",
		editGroupPopup,
	]);

	const {
		form,
		changeName,
		setIcon,
		setColor,
		isFriendSelected,
		selectFriend,
		unSelectFriend,
		addGuest,
		removeOriginalGuest,
		removeNewGuest,
		submitForm,
		editingGroup,
	} = useEditGroupForm(groupData!);

	const filteredFriends = useMemo(() => {
		const term = friendSearch.trim().toLowerCase();
		const list = friends ?? [];

		if (!term) return list;

		return list.filter((friend) =>
			friend.full_name.toLowerCase().includes(term),
		);
	}, [friends, friendSearch]);

	useEffect(() => {
		if (friendError)
			toast({ message: "Error fetching friends", success: false });
	}, [friendError]);

	return (
		<div className="fixed top-0 left-0 flex items-center justify-center backdrop-blur-sm h-screen w-screen z-40 bg-black/30">
			<div className="glass-panel w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
				<div className="px-5 py-3 flex items-center justify-between border-b border-white/5">
					<h2 className="text-xl font-extrabold tracking-tight text-white">
						Edit Group
					</h2>
					<button
						onClick={closeEditGroupPopup}
						className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"
					>
						<span className="material-symbols-outlined text-slate-400">
							close
						</span>
					</button>
				</div>
				<div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
					<section className="space-y-6">
						<div>
							<label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 px-1">
								Group Name
							</label>
							<input
								value={form.name}
								onChange={(e) => changeName(e.target.value)}
								className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-600"
								placeholder="e.g. Weekend Getaway"
								type="text"
							/>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<IconSelect
								selectedIcon={form.icon}
								setIcon={setIcon}
							/>
							<ColorPicker
								selectedColor={form.color}
								setColor={setColor}
							/>
						</div>
					</section>
					<section className="space-y-4">
						<div className="flex items-center justify-between px-1">
							<label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">
								Select Friends
							</label>
							<span className="text-[10px] font-medium text-slate-600">
								{form.users.length} SELECTED
							</span>
						</div>
						<div className="relative">
							<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl">
								search
							</span>
							<input
								value={friendSearch}
								onChange={(e) =>
									setFriendSearch(e.target.value)
								}
								className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-600"
								placeholder="Search your friends..."
								type="text"
							/>
						</div>
						<div className="bg-white/5 rounded-2xl border border-white/5 divide-y divide-white/5 overflow-hidden">
							{fetchingFriends ? (
								<Loader size={20} />
							) : filteredFriends.length === 0 ? (
								<p className="p-6 text-center text-sm text-slate-400">
									No friends found.
								</p>
							) : (
								filteredFriends.map((friend) => (
									<FriendPicker
										key={friend.internal_id}
										friend={friend}
										isSelected={isFriendSelected(friend)}
										selectFriend={selectFriend}
										unSelectFriend={unSelectFriend}
									/>
								))
							)}
						</div>

						<div className="flex flex-col gap-3 pt-2">
							<label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 px-1">
								Or Add Guest
							</label>
							<div className="flex items-center gap-2">
								<input
									value={guestName}
									onChange={(e) =>
										setGuestName(e.target.value)
									}
									className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-600"
									placeholder="Guest name..."
									type="text"
								/>
								<button
									onClick={() => addGuest(guestName)}
									className="bg-white/10 px-5 py-3 rounded-2xl text-sm font-bold border border-white/5 text-white hover:bg-white/20 transition-all"
								>
									Add Guest
								</button>
							</div>
						</div>
						<div className="flex flex-wrap gap-2 pt-2">
							{form.users.map((member) => (
								<Token
									key={member.internal_id}
									isCurrentUser={
										user!.internal_id === member.internal_id
									}
									avatar_url={member.avatar_url}
									name={member.name}
									onRemove={() => unSelectFriend(member)}
								/>
							))}
							{form.newUsers.map((newUser) => (
								<Token
									key={newUser.internal_id}
									isCurrentUser={
										user!.internal_id ===
										newUser.internal_id
									}
									avatar_url={newUser.avatar_url}
									name={newUser.full_name}
									onRemove={() => unSelectFriend(newUser)}
								/>
							))}
							{form.guests.map((guest) => (
								<Token
									key={guest.member_id}
									name={guest.name}
									onRemove={() => removeOriginalGuest(guest)}
								/>
							))}
							{form.newGuests.map((guest, index) => (
								<Token
									key={index}
									name={guest}
									onRemove={() => removeNewGuest(index)}
								/>
							))}
						</div>
					</section>
				</div>
				<div className="p-5 bg-white/5 border-t border-white/5">
					<button
						onClick={submitForm}
						className="w-full bg-primary hover:bg-blue-600 text-white py-5 rounded-2xl font-black text-md shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
					>
						<>
							<span className="material-symbols-outlined">
								group_add
							</span>
							{editingGroup ? "Editing..." : "Edit Group"}
						</>
					</button>
				</div>
			</div>
		</div>
	);
}

export default EditGroupPopup;
