import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	updateTask as updatedTaskApi,
	type UpdateTaskRequest,
} from "../../api";

export const useUpdateTask = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["tasks", "update"],
		mutationFn: (updatedTask: UpdateTaskRequest) => updatedTaskApi(updatedTask),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
			queryClient.invalidateQueries({
				queryKey: ["task", variables.id],
			});
		},
	});
};
