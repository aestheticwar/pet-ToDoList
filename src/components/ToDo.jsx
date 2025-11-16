import { useState, useEffect } from "react";
import { AddTaskForm } from "./AddTaskForm";
import { SearchTaskForm } from "./SearchTaskForm";
import { ToDoInfo } from "./ToDoInfo";
import { ToDoList } from "./ToDoList";

const ToDo = () => {
	const [tasks, setTasks] = useState(() => {
		const savedTasks = localStorage.getItem("tasks");
		if (savedTasks) {
			return JSON.parse(savedTasks);
		} else return [];
	});

	const [newTaskTitle, setNewTaskTitle] = useState("");

	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));
		if (tasksFromLocalStorage && tasksFromLocalStorage.length > 0) {
			setTasks(tasksFromLocalStorage);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);


	const deleteAllTasks = () => {
		const isConfirm = confirm("Are you sure you want to delete tasks?");

		if (isConfirm) {
			setTasks([]);
		}
	};

	const deleteTask = (task_id) => {
		const deleteTaskName = tasks.find((task) => task.id === task_id).title;
		const isConfirm = confirm(`Are you sure you want to delete task with name: ${deleteTaskName}?`);
		if (isConfirm) {
			setTasks(tasks.filter((task) => task.id !== task_id));
		}
	};

	const toogleTaskCompleted = (task_id, isDone) => {
		setTasks(
			tasks.map((task) => {
				if (task.id === task_id) {
					return { ...task, isDone };
				} else return task;
			})
		);
	};

	const addTask = () => {
		if (newTaskTitle.trim().length > 0) {
			const newTask = {
				id: crypto?.randomUUID() ?? Date.now().toString(),
				title: newTaskTitle,
				isDone: false
			};
			setTasks([...tasks, newTask]);
			setNewTaskTitle("");
			setSearchQuery("");
		}
	};

	const done = tasks.filter((task) => task.isDone).length;

	const clearedSearchQuery = searchQuery.trim().toLowerCase();

	const filteredTasks = clearedSearchQuery.length > 0 ?
		tasks.filter((task) => {
			return task.title.toLowerCase().includes(searchQuery.toLowerCase());
		}) : null;

	return (
		<div className="todo">
			<h1 className="todo__title">To Do List</h1>
			<AddTaskForm
				newTaskTitle={newTaskTitle}
				addTask={addTask}
				setNewTaskTitle={setNewTaskTitle}
			/>
			<SearchTaskForm
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>
			<ToDoInfo
				total={tasks.length}
				done={done}
				onDeleteAllButtonClick={deleteAllTasks}
			/>
			<ToDoList
				tasks={tasks}
				filteredTasks={filteredTasks}
				onDeleteTaskButtonClick={deleteTask}
				onTaskCompletedChange={toogleTaskCompleted}
			/>
		</div>
	);
};

export { ToDo };
