import { useToast } from "./context.hooks.ts";
import { type QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { handleError } from "../errors/errorHandler.ts";
import { useEffect } from "react";

/**
 *  Simple mutation hook that can be used to render toast on success
 *  and on error
 */
export function useToastNavMutation<TData, TVariables = void>(
	mutationFn: (variables: TVariables) => Promise<TData>,
	successMessage: string,
	redirectTo?: string,
) {
	const { toast } = useToast();
	const navigate = useNavigate();

	return useMutation<TData, unknown, TVariables>({
		mutationFn,
		onSuccess: () => {
			toast(successMessage, true);
			if (redirectTo) {
				navigate(redirectTo);
			}
		},
		onError: (error) => {
			handleError(error, toast);
		},
	});
}

/**
 *  Simple mutation hook that only renders toast on error
 */
export function useToastErrorMutation<TData, TVariables>(
	mutationFn: (variables?: TVariables) => Promise<TData>,
) {
	const { toast } = useToast();

	return useMutation<TData, unknown, TVariables>({
		mutationFn,
		onError: (error) => {
			handleError(error, toast);
		},
	});
}

/**
 *  Simple query hook that renders toast on error
 */
export function useToastErrorQuery<
	TQueryFnData,
	TQueryKey extends QueryKey = QueryKey,
>(queryKey: TQueryKey, queryFn: () => Promise<TQueryFnData>) {
	const { toast } = useToast();

	const query = useQuery({
		queryKey,
		queryFn,
	});

	useEffect(() => {
		if (query.error) handleError(query.error, toast);
	}, [query.error, toast]);

	return query;
}
