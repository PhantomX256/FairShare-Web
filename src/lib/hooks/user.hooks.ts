import { getCurrentUserData } from "../api/user.api.ts";
import { useQuery } from "@tanstack/react-query";

export function useGetCurrentUserData() {
	return useQuery({
		queryFn: getCurrentUserData,
		queryKey: ["user"],
		retry: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});
}
