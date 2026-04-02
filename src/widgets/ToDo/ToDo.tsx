import { AddTaskForm } from "@/features/add-task";
import { SearchTaskForm } from "@/features/search-task";
import ToDoInfo from "@/features/stats";
import { ToDoList } from "@/entities/task";
import styles from "./ToDo.module.scss";
import { Modal } from "@/shared/ui/Modal";
import { useState } from "react";

const ToDo = () => {
	return (
		<div className={styles.todo}>
			<h1 className={styles.title}>To Do List</h1>
			<Modal title="Диалог" />
			<AddTaskForm />
			<SearchTaskForm />
			<ToDoInfo />
			<ToDoList />
		</div>
	);
};

export { ToDo };
