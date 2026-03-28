import { http } from "@/shared/api/http";
import { Task } from "../model";

interface GetTasksRequest {
	user_id: number;
	limit?: number;
	offset?: number;
}

interface CreateTaskRequest {
	title: string;
	description: string;
	author_user_id: number;
}

interface UpdateTaskRequest {
	id: number;
	updatedFields: Partial<Pick<Task, "title" | "completed" | "description">>;
}

const getTask = (id: number) => {
	return http<Task>(`/tasks/${id}`);
};

const getTasks = (params: GetTasksRequest) => {
	const { user_id, offset = 0, limit = 10 } = params;
	const searchParams = new URLSearchParams();
	searchParams.set("user_id", user_id.toString());
	searchParams.set("offset", offset.toString());
	searchParams.set("limit", limit.toString());

	return http<Task[]>(`/tasks?${searchParams.toString()}`);
};

const deleteTask = (id: number) => {
	return http<void>(`/tasks/${id}`, { method: "DELETE" });
};

const createTask = (task: CreateTaskRequest) => {
	return http<Task>("/tasks", { method: "POST", body: task });
};

const updateTask = (updatedTask: UpdateTaskRequest) => {
	const { id, updatedFields } = updatedTask;
	return http<Task>(`/tasks/${id}`, { method: "PATCH", body: updatedFields });
};

export { createTask, getTask, getTasks, deleteTask, updateTask };

export type { GetTasksRequest, CreateTaskRequest, UpdateTaskRequest };
