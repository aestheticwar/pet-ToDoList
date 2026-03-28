import { useQuery } from "@tanstack/react-query";
import { getTask as getTaskApi } from "../../api";

export const useTask = (id: number) => {
	return useQuery({
		queryKey: ["task", id],
		queryFn: () => getTaskApi(id),
		enabled: !!id,
	});
};
