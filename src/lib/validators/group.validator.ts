import { string, z } from "zod";
import { GROUP_ICONS } from "../constants/constants.ts";

export const GuestName = z.string().min(1);

export const CreateGroupSchema = z.object({
	name: z.string().min(1, "Invalid Group Name"),
	icon: z.enum(GROUP_ICONS),
	color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color"),
	users: z
		.array(
			z.object({
				id: z.uuid(),
				internal_id: z.number(),
				full_name: z.string(),
				email: z.email(),
				avatar_url: z.string(),
				created_at: z.string(),
			}),
		)
		.min(1),
	guests: z.array(string().min(1, "Invalid Guest Name")),
});
