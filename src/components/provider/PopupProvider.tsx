import {type ReactNode, useState} from "react";
import {PopupContext} from "../context/PopupContext.ts";

export function PopupProvider({children}: { children: ReactNode }) {
    const [userProfilePopup, setUserProfilePopup] = useState(0);
    const [createGroupPopup, setCreateGroupPopup] = useState(false);
    const [editGroupPopup, setEditGroupPopup] = useState("");
    const [editGuestNamePopup, setEditGuestNamePopup] = useState({memberId: 0, name: ""});

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
                editGroupPopup,
                openEditGroupPopup: (groupId: string) => setEditGroupPopup(groupId),
                closeEditGroupPopup: () => setEditGroupPopup(""),
                editGuestNamePopup,
                openEditGuestNamePopup: (memberId: number, name: string) => setEditGuestNamePopup({memberId, name}),
                closeEditGuestNamePopup: () => setEditGuestNamePopup({memberId: 0, name: ""}),
            }}
        >
            {children}
        </PopupContext.Provider>
    );
}
