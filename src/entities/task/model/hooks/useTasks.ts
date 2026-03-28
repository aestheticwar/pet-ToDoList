import { useQuery } from "@tanstack/react-query";
import { getTasks as getTasksApi, type GetTasksRequest } from "../../api";

export const useTasks = (params: GetTasksRequest) => {
	return useQuery({
		queryKey: ["tasks", "list", params],
		queryFn: () => getTasksApi(params),
	});
};
