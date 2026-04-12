import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getGroupBalances } from "../api/balance.api.ts";
import { minutes } from "../utils/date.utils.ts";
import { AppError } from "../errors/app.error.ts";
import { ERROR_SEVERITY } from "../constants/constants.ts";

export function useGetGroupBalances(groupId?: string) {
	return useQuery({
		queryFn: () => {
			if (!groupId)
				throw new AppError("Invalid Group ID", ERROR_SEVERITY.LOG);
			return getGroupBalances(groupId);
		},
		queryKey: ["group", groupId, "balances"],
		refetchOnWindowFocus: false,
		staleTime: minutes(5),
		placeholderData: keepPreviousData,
		enabled: !!groupId,
	});
}
