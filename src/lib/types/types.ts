export interface User {
	internal_id: number;
	id: string;
	full_name: string;
	email: string;
	avatar_url: string;
	created_at: string;
}

export interface AuthContextType {
	user: User | null;
	isLoggedIn: boolean;
	login: (credential: string) => Promise<void>;
	logout: () => Promise<void>;
	isLoggingOut: boolean;
}

export interface ToastProps {
	message: string;
	success: boolean;
	id: string | number;
}

export interface ReceivedFriendRequest {
	receiver_id: number;
	created_at: string;
	sender: User;
}

export interface SentFriendRequest {
	sender_id: number;
	created_at: string;
	receiver: User;
}

export interface PopupContextType {
	userProfilePopup: number;
	openUserProfilePopup: (userInternalId: number) => void;
	closeUserProfilePopup: () => void;
	createGroupPopup: boolean;
	openCreateGroupPopup: () => void;
	closeCreateGroupPopup: () => void;
}

export interface Group {
	id: string;
	internal_id: number;
	name: string;
	icon: string;
	color: string;
	created_by: number;
	created_at: string;
	member_count?: number;
	avatars?: string[];
}

export interface CreateGroupForm {
	name: string;
	icon: string;
	color: string;
	users: User[];
	guests: string[]
}

export interface Member {
	id: string;
	internal_id?: number;
	name: string;
	email: string;
	avatar_url?: string;
}

export interface GroupData {
	group: Group;
	members: Member[];
}