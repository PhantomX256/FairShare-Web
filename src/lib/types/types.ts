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

export interface Toast {
	id: number;
	message: string;
	success: boolean;
}

export interface ToastContextType {
	toast: (message: string, success: boolean) => void;
	toasts: Toast[];
	dismiss: (id: number) => void;
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
}

export interface CreateGroupForm {
	name: string;
	icon: string;
	color: string;
	users: User[];
	guests: string[]
}