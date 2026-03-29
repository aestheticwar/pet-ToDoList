import { AddTaskForm } from "@/features/add-task";
import { SearchTaskForm } from "@/features/search-task";
import ToDoInfo from "@/features/stats";
import { ToDoList } from "@/entities/task";
import { Button } from "@/shared/ui/Button";
import { useContext } from "react";
import { TasksContext } from "@/entities/task";
import styles from "./ToDo.module.scss";

const ToDo = () => {
	const { firstIncompleteTaskRef } = useContext(TasksContext);
	return (
		<div className={styles.todo}>
			<h1 className={styles.title}>To Do List</h1>
			<AddTaskForm />
			<SearchTaskForm />
			<ToDoInfo />
			<Button
				onClick={() =>
					firstIncompleteTaskRef.current?.scrollIntoView({
						behavior: "smooth",
					})
				}
			>
				Show first incomplete task
			</Button>
			<ToDoList />
		</div>
	);
};

export { ToDo };
