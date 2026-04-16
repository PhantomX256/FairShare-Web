export interface User {
	internal_id: number;
	id: string;
	full_name: string;
	email: string;
	avatar_url: string;
	created_at: string;
}

export interface FriendData {
	friendsSince: string;
	sharedGroupsIds: string[];
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
	userProfilePopup: string;
	openUserProfilePopup: (userId: string) => void;
	closeUserProfilePopup: () => void;
	createGroupPopup: boolean;
	openCreateGroupPopup: () => void;
	closeCreateGroupPopup: () => void;
	editGroupPopup: string;
	openEditGroupPopup: (groupInternalId: string) => void;
	closeEditGroupPopup: () => void;
	editGuestNamePopup: { memberId: number; name: string };
	openEditGuestNamePopup: (memberId: number, name: string) => void;
	closeEditGuestNamePopup: () => void;
	addExpensePopup: boolean;
	openAddExpensePopup: () => void;
	closeAddExpensePopup: () => void;
	deleteExpensePopup: string;
	openDeleteExpensePopup: (expenseId: string) => void;
	closeDeleteExpensePopup: () => void;
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
	guests: string[];
}

export interface Member {
	member_id: number;
	user_id?: string;
	internal_id?: number;
	name: string;
	email?: string;
	avatar_url?: string;
}

export interface Guest {
	member_id: number;
	name: string;
	isOriginalMember: boolean;
}

export interface GroupData {
	group: Group;
	members: Member[];
}

export interface EditGroupForm {
	groupInternalId: number;
	name: string;
	icon: string;
	color: string;
	users: Member[];
	guests: Guest[];
	newUsers: User[];
	newGuests: string[];
	removeMembers: Member[];
}

export interface EditGroupRequest {
	groupId: string;
	name?: string;
	icon?: string;
	color?: string;
	newUsers: number[];
	newGuests: string[];
	removeMembers: number[];
}

export interface Payer {
	memberId: number;
	paidAmount: number;
	paidAmountString: string;
}

export interface InvolvedMember {
	memberId: number;
	owedAmount: number;
	owedAmountString: string;
	parts: number;
}

export type SplitMode = "equally" | "parts" | "specific";

export interface AddExpenseForm {
	groupId: string;
	title: string;
	icon: string;
	amount: number;
	amountString: string;
	areMultiplePayers: boolean;
	paidBy: Payer[];
	splitMode: SplitMode;
	membersInvolved: InvolvedMember[];
}

export interface AddExpenseRequest {
	groupId: string;
	title: string;
	icon: string;
	amount: number;
	paidBy: Omit<Payer, "paidAmountString">[];
	splitMode: SplitMode;
	membersInvolved: Omit<InvolvedMember, "owedAmountString" | "parts">[];
	isTransaction: boolean;
}

export interface Expense {
	internal_id: number;
	id: string;
	title: string;
	icon: string;
	amount: number;
	split_mode: string | null;
	is_transaction: boolean;
	created_at: string;
	user_balance: number;
	paid_by: number[];
}

export interface ExpenseData {
	group: {
		id: string;
		name: string;
		color: string;
	};
	expense: {
		title: string;
		icon: string;
		amount: number;
		split_mode: SplitMode | null;
		created_at: string;
	};
	expenseMembers: {
		member_id: number;
		name: string;
		avatar_url: string | null;
		paid_amount: number;
		owed_amount: number;
		parts: number;
		user_id: number | null;
		is_active: boolean;
	}[];
}

export interface RecentActivity {
	expense: {
		id: string;
		title: string;
		icon: string;
		created_at: string;
		updated_at: string;
	};
	group: {
		name: string;
		color: string;
	};
	created_by: {
		internal_id: number;
		name: string | null;
	};
	modified_by: {
		internal_id: number;
		name: string | null;
	};
	user_balance: number;
}

export interface Balance {
	member_id: number;
	balance: number;
}

export interface Transaction {
	fromMemberId: number;
	toMemberId: number;
	amount: number;
}
