import { useQuery } from "@tanstack/react-query";
import { getAllGroups } from "../api/group.api.ts";
import { minutes } from "../utils/date.utils.ts";

export function useGetAllGroups() {
	return useQuery({
		queryKey: ["groups"],
		queryFn: getAllGroups,
		refetchOnWindowFocus: false,
		staleTime: minutes(5),
	});
}