import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	createTask as createTaskApi,
	type CreateTaskRequest,
} from "../../../entities/task/api";

export const useCreateTask = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["tasks", "create"],
		mutationFn: (task: CreateTaskRequest) => createTaskApi(task),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
	});
};
