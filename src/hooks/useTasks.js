import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import useTasksLocalStorage from "./useTasksLocalStorage";

const useTasks = () => {
	const { savedTasks, saveTasks } = useTasksLocalStorage();
	const [tasks, setTasks] = useState(savedTasks ?? []);
	const [newTaskTitle, setNewTaskTitle] = useState("");
	const [searchQuery, setSearchQuery] = useState("");

	const newTaskInputRef = useRef(null);

	useEffect(() => {
		saveTasks(tasks);
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

	const deleteTask = useCallback(
		(task_id) => {
			const deleteTaskName = tasks.find((task) => task.id === task_id).title;
			const isConfirm = confirm(
				`Are you sure you want to delete task with name: ${deleteTaskName}?`
			);
			if (isConfirm) {
				setTasks(tasks.filter((task) => task.id !== task_id));
			}
			newTaskInputRef.current.focus();
		},
		[tasks]
	);

	const toogleTaskCompleted = useCallback(
		(task_id, isDone) => {
			setTasks(
				tasks.map((task) => {
					if (task.id === task_id) {
						return { ...task, isDone };
					} else return task;
				})
			);
		},
		[tasks]
	);

	const addTask = useCallback(() => {
		if (newTaskTitle.trim().length > 0) {
			const newTask = {
				id: crypto?.randomUUID() ?? Date.now().toString(),
				title: newTaskTitle,
				isDone: false,
			};
			setTasks((prevState) => [...prevState, newTask]);
			setNewTaskTitle("");
			setSearchQuery("");
			newTaskInputRef.current.focus();
		}
	}, [newTaskTitle]);

	const filteredTasks = useMemo(() => {
		const clearedSearchQuery = searchQuery.trim().toLowerCase();
		return clearedSearchQuery.length > 0
			? tasks.filter((task) => {
					return task.title.toLowerCase().includes(searchQuery.toLowerCase());
			  })
			: null;
	}, [tasks, searchQuery]);

	return {
		tasks,
		filteredTasks,
		deleteTask,
		deleteAllTasks,
		toogleTaskCompleted,
		newTaskTitle,
		setNewTaskTitle,
		searchQuery,
		setSearchQuery,
		newTaskInputRef,
		addTask,
	};
};

export default useTasks;
