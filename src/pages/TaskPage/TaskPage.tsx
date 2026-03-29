import { useParams } from "@tanstack/react-router";
import { useTask } from "@/entities/task/model/hooks/useTask";

const TaskPage = () => {
	const { id } = useParams({ strict: false });
	const { data: task, isLoading, error } = useTask(id);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Task not found!</div>;
	return (
		<div>
			<h1>{task.title}</h1>
			<p>{task.completed ? "Задача выполнена" : "Задача не выполнена"}</p>
		</div>
	);
};

export default TaskPage;
