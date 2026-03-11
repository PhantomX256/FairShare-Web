import { type ReactNode, useState } from "react";
import { PopupContext } from "../context/PopupContext.ts";

export function PopupProvider({ children }: { children: ReactNode }) {
	const [userProfilePopup, setUserProfilePopup] = useState(0);

	function openUserProfilePopup(userInternalId: number) {
		setUserProfilePopup(userInternalId);
	}

	function closeUserProfilePopup() {
		setUserProfilePopup(0);
	}

	return (
		<PopupContext.Provider
			value={{
				userProfilePopup,
				openUserProfilePopup,
				closeUserProfilePopup,
			}}
		>
			{children}
		</PopupContext.Provider>
	);
}
