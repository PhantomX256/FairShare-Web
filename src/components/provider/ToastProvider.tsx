import {type ReactNode, useState} from "react";
import {ToastContext} from "../context/ToastContext";

interface Toast {
    id: number;
    message: string;
    success: boolean;
}

export function ToastProvider({children}: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    function toast(message: string, success: boolean) {
        const id = Date.now();
        setToasts((prev) => [...prev, {id, message, success}]);
        setTimeout(() => dismiss(id), 4000);
    }

    function dismiss(id: number) {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }

    return (
        <ToastContext.Provider value={{toast, toasts, dismiss}}>
            {children}
        </ToastContext.Provider>
    );
}