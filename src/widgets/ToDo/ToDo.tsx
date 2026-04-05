import { SearchTaskForm } from "@/features/search-task";
import ToDoInfo from "@/features/stats";
import { ToDoList } from "@/entities/task";
import { AddTaskModal } from "@/features/add-task";
import styles from "./ToDo.module.scss";

const ToDo = () => {
	return (
		<div className={styles.todo}>
			<h1 className={styles.title}>To Do List</h1>
			<AddTaskModal />
			<SearchTaskForm />
			<ToDoInfo />
			<ToDoList />
		</div>
	);
};

export { ToDo };
