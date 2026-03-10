export interface User {
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
	sender: {
		internal_id: number;
		full_name: string;
		avatar_url: string;
	};
}

export interface SentFriendRequest {
	sender_id: number;
	created_at: string;
	receiver: {
		internal_id: number;
		full_name: string;
		avatar_url: string;
	}
}