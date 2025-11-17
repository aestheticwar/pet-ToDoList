import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { AddTaskForm } from "./AddTaskForm";
import { SearchTaskForm } from "./SearchTaskForm";
import ToDoInfo from "./ToDoInfo";
import ToDoList from "./ToDoList";
import { Button } from "./Button";

const ToDo = () => {
	const [tasks, setTasks] = useState(() => {
		const savedTasks = localStorage.getItem("tasks");
		if (savedTasks) {
			return JSON.parse(savedTasks);
		} else return [];
	});
	const [newTaskTitle, setNewTaskTitle] = useState("");
	const [searchQuery, setSearchQuery] = useState("");

	const newTaskInputRef = useRef(null);
	const firstIncompleteTaskRef = useRef(null);
	const firstIncompleteTaskId = tasks.find((task) => task.isDone === false)?.id;

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);

	useEffect(() => {
		newTaskInputRef.current.focus();
	}, []);

	const deleteAllTasks = useCallback(() => {
		const isConfirm = confirm("Are you sure you want to delete tasks?");

		if (isConfirm) {
			setTasks([]);
		}
		newTaskInputRef.current.focus();
	}, []);

	const deleteTask = useCallback((task_id) => {
		const deleteTaskName = tasks.find((task) => task.id === task_id).title;
		const isConfirm = confirm(`Are you sure you want to delete task with name: ${deleteTaskName}?`);
		if (isConfirm) {
			setTasks(tasks.filter((task) => task.id !== task_id));
		}
		newTaskInputRef.current.focus();
	}, [tasks]);

	const toogleTaskCompleted = useCallback((task_id, isDone) => {
		setTasks(
			tasks.map((task) => {
				if (task.id === task_id) {
					return { ...task, isDone };
				} else return task;
			})
		);
	}, [tasks]);

	const addTask = useCallback(() => {
		if (newTaskTitle.trim().length > 0) {
			const newTask = {
				id: crypto?.randomUUID() ?? Date.now().toString(),
				title: newTaskTitle,
				isDone: false
			};
			setTasks((prevState) => [...prevState, newTask]);
			setNewTaskTitle("");
			setSearchQuery("");
			newTaskInputRef.current.focus();
		}
	}, [newTaskTitle]);

	const doneTasks = useMemo(() => {
		return tasks.filter((task) => task.isDone).length;
	}, [tasks]);

	const filteredTasks = useMemo(() => {
		const clearedSearchQuery = searchQuery.trim().toLowerCase();
		return clearedSearchQuery.length > 0 ?
			tasks.filter((task) => {
				return task.title.toLowerCase().includes(searchQuery.toLowerCase());
			}) : null;
	}, [tasks, searchQuery]);

	return (
		<div className="todo">
			<h1 className="todo__title">To Do List</h1>
			<AddTaskForm
				newTaskTitle={newTaskTitle}
				setNewTaskTitle={setNewTaskTitle}
				addTask={addTask}
				newTaskInputRef={newTaskInputRef}
			/>
			<SearchTaskForm
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>
			<ToDoInfo
				total={tasks.length}
				done={doneTasks}
				onDeleteAllButtonClick={deleteAllTasks}
			/>
			<Button
				onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({ behavior: "smooth" })}
			>
				Show first incomplete task
			</Button>
			<ToDoList
				tasks={tasks}
				filteredTasks={filteredTasks}
				onDeleteTaskButtonClick={deleteTask}
				onTaskCompletedChange={toogleTaskCompleted}
				firstIncompleteTaskId={firstIncompleteTaskId}
				firstIncompleteTaskRef={firstIncompleteTaskRef}
			/>
		</div>
	);
};

export { ToDo };
