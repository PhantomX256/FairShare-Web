import { z } from "zod";

export const SendRequestSchema = z.union([
	z.email("Must be a valid email"),
	z.uuid("Must be a valid User ID"),
]);