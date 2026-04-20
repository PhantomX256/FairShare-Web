import { type ReactNode, useState } from "react";
import { PopupContext } from "../context/PopupContext.ts";
import type { ConfirmationPopup } from "../../lib/types/types.ts";

export function PopupProvider({ children }: { children: ReactNode }) {
	const [userProfilePopup, setUserProfilePopup] = useState("");
	const [createGroupPopup, setCreateGroupPopup] = useState(false);
	const [editGroupPopup, setEditGroupPopup] = useState("");
	const [editGuestNamePopup, setEditGuestNamePopup] = useState({
		memberId: 0,
		name: "",
	});
	const [addExpensePopup, setAddExpensePopup] = useState("");
	const [deleteExpensePopup, setDeleteExpensePopup] = useState("");
	const [editExpensePopup, setEditExpensePopup] = useState("");
	const [confirmationPopup, setConfirmationPopup] =
		useState<ConfirmationPopup>({
			question: "",
		});

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
				openAddExpensePopup: (groupId: string) =>
					setAddExpensePopup(groupId),
				closeAddExpensePopup: () => setAddExpensePopup(""),
				deleteExpensePopup,
				openDeleteExpensePopup: (expenseId: string) =>
					setDeleteExpensePopup(expenseId),
				closeDeleteExpensePopup: () => setDeleteExpensePopup(""),
				editExpensePopup,
				openEditExpensePopup: (expenseId: string) =>
					setEditExpensePopup(expenseId),
				closeEditExpensePopup: () => setEditExpensePopup(""),
				confirmationPopup,
				openConfirmationPopup: (confirmationPopup: ConfirmationPopup) =>
					setConfirmationPopup(confirmationPopup),
				closeConfirmationPopup: () =>
					setConfirmationPopup({ question: "" }),
			}}
		>
			{children}
		</PopupContext.Provider>
	);
}
