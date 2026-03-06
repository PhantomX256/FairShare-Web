import {createContext} from "react";

interface Toast {
    id: number;
    message: string;
    success: boolean;
}

interface ToastContextType {
    toast: (message: string, success: boolean) => void;
    toasts: Toast[];
    dismiss: (id: number) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);