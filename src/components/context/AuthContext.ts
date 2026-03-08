import { createContext } from "react";
import type { AuthContextType } from "../../lib/types/types.ts";

export const AuthContext = createContext<AuthContextType | null>(null);
