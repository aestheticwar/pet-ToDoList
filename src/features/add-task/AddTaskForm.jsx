import { useContext, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { TasksContext } from "@/entities/todo";

const AddTaskForm = ({ styles }) => {
	const [newTaskTitle, setNewTaskTitle] = useState("");
	const { addTask, newTaskInputRef } = useContext(TasksContext);

	const onSubmit = (e) => {
		e.preventDefault();
		addTask(newTaskTitle, () => setNewTaskTitle(""));
	};
	return (
		<form className={styles.form} onSubmit={(e) => onSubmit(e)}>
			<Field
				className={styles.field}
				label="New task title"
				id="new-task"
				value={newTaskTitle}
				onInput={(e) => setNewTaskTitle(e.target.value)}
				ref={newTaskInputRef}
			/>
			<Button type="submit">Add</Button>
		</form>
	);
};

export { AddTaskForm };
