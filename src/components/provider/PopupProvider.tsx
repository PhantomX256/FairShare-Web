import { type ReactNode, useState } from "react";
import { PopupContext } from "../context/PopupContext.ts";

export function PopupProvider({ children }: { children: ReactNode }) {
	const [userProfilePopup, setUserProfilePopup] = useState("");
	const [createGroupPopup, setCreateGroupPopup] = useState(false);
	const [editGroupPopup, setEditGroupPopup] = useState("");
	const [editGuestNamePopup, setEditGuestNamePopup] = useState({
		memberId: 0,
		name: "",
	});
	const [addExpensePopup, setAddExpensePopup] = useState(false);
	const [deleteExpensePopup, setDeleteExpensePopup] = useState("");

	return (
		<PopupContext.Provider
			value={{
				userProfilePopup,
				openUserProfilePopup: (userId: string) =>
					setUserProfilePopup(userId),
				closeUserProfilePopup: () => setUserProfilePopup(""),
				createGroupPopup,
				openCreateGroupPopup: () => setCreateGroupPopup(true),
				closeCreateGroupPopup: () => setCreateGroupPopup(false),
				editGroupPopup,
				openEditGroupPopup: (groupId: string) =>
					setEditGroupPopup(groupId),
				closeEditGroupPopup: () => setEditGroupPopup(""),
				editGuestNamePopup,
				openEditGuestNamePopup: (memberId: number, name: string) =>
					setEditGuestNamePopup({ memberId, name }),
				closeEditGuestNamePopup: () =>
					setEditGuestNamePopup({ memberId: 0, name: "" }),
				addExpensePopup,
				openAddExpensePopup: () => setAddExpensePopup(true),
				closeAddExpensePopup: () => setAddExpensePopup(false),
				deleteExpensePopup,
				openDeleteExpensePopup: (expenseId: string) =>
					setDeleteExpensePopup(expenseId),
				closeDeleteExpensePopup: () => setDeleteExpensePopup(""),
			}}
		>
			{children}
		</PopupContext.Provider>
	);
}
