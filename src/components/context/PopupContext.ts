import { createContext } from "react";
import type { PopupContextType } from "../../lib/types/types.ts";

export const PopupContext = createContext<PopupContextType | null>(null);