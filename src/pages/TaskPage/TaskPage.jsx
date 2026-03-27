import { useEffect } from "react";
import { useState } from "react";
import tasksAPI from "@/shared/api/tasks";
import { useParams } from "@tanstack/react-router";

const TaskPage = () => {
	const { id } = useParams({ strict: false });

	const [task, setTask] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		tasksAPI
			.getById(id)
			.then((taskData) => {
				setTask(taskData);
				setHasError(false);
			})
			.catch(() => {
				setHasError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	if (isLoading) return <div>Loading...</div>;
	if (hasError) return <div>Task not found!</div>;
	return (
		<div>
			<h1>{task.title}</h1>
			<p>{task.isDone ? "Задача выполнена" : "Задача не выполнена"}</p>
		</div>
	);
};

export default TaskPage;
