import { getCurrentUserData } from "../api/user.api.ts";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetCurrentUserData() {
	const queryClient = useQueryClient();
	const existingData = queryClient.getQueryData(["user"]);

	return useQuery({
		queryFn: getCurrentUserData,
		queryKey: ["user"],
		retry: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
		// If the user logs out then don't query again
		enabled: existingData !== null
	});
}
