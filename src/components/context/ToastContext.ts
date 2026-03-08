import { createContext } from "react";
import type { ToastContextType } from "../../lib/types/types.ts";

export const ToastContext = createContext<ToastContextType | null>(null);
