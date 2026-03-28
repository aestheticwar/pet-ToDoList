import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask as deleteTaskApi } from "../../api";

export const useDeleteTask = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["tasks", "delete"],
		mutationFn: (id: number) => deleteTaskApi(id),
		onSuccess: (_, id) => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
			queryClient.removeQueries({ queryKey: ["task", id] });
		},
	});
};
