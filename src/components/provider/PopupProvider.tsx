import { type ReactNode, useState } from "react";
import { PopupContext } from "../context/PopupContext.ts";

export function PopupProvider({ children }: { children: ReactNode }) {
	const [userProfilePopup, setUserProfilePopup] = useState(0);
	const [createGroupPopup, setCreateGroupPopup] = useState(false);

	return (
		<PopupContext.Provider
			value={{
				userProfilePopup,
				openUserProfilePopup: (userInternalId: number) =>
					setUserProfilePopup(userInternalId),
				closeUserProfilePopup: () => setUserProfilePopup(0),
				createGroupPopup,
				openCreateGroupPopup: () => setCreateGroupPopup(true),
				closeCreateGroupPopup: () => setCreateGroupPopup(false),
			}}
		>
			{children}
		</PopupContext.Provider>
	);
}
