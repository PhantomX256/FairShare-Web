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
	login: (credential: string) => void;
	logout: () => void;
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
