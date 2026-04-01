import { FormEvent, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { useCreateTask } from "@/entities/task/model/hooks/useCreateTask";
import { CreateTaskRequest } from "@/entities/task/api";
import styles from "./AddTaskForm.module.scss";

const AddTaskForm = () => {
	const [newTaskTitle, setNewTaskTitle] = useState("");
	const { mutate } = useCreateTask();

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newTask: CreateTaskRequest = {
			title: newTaskTitle,
			author_user_id: 2,
			description: "Описание задачи",
		};
		mutate(newTask);
		setNewTaskTitle("");
	};

	return (
		<form className={styles.form} onSubmit={(e) => onSubmit(e)}>
			<Field
				className={styles.field}
				label="New task title"
				id="new-task"
				value={newTaskTitle}
				onInput={(e) => setNewTaskTitle(e.target.value)}
			/>
			<Button type="submit">Add</Button>
		</form>
	);
};

export { AddTaskForm };
