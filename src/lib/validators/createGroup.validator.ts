import { z } from "zod";

export const GuestName = z.string().min(1);