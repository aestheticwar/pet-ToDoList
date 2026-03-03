import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import tasksAPI from "../api/tasksAPI";

const useTasks = () => {
	const [tasks, setTasks] = useState([]);
	const [newTaskTitle, setNewTaskTitle] = useState("");
	const [searchQuery, setSearchQuery] = useState("");

	const newTaskInputRef = useRef(null);

	useEffect(() => {
		tasksAPI.getAll().then(setTasks);
		newTaskInputRef.current.focus();
	}, []);

	const deleteAllTasks = useCallback(() => {
		const isConfirm = confirm("Are you sure you want to delete tasks?");

		if (isConfirm) {
			tasksAPI.deleteAll(tasks).then(() => setTasks([]));
		}
		newTaskInputRef.current.focus();
	}, [tasks]);

	const deleteTask = useCallback(
		(task_id) => {
			const deleteTaskName = tasks.find((task) => task.id === task_id).title;
			const isConfirm = confirm(
				`Are you sure you want to delete task with name: ${deleteTaskName}?`,
			);
			if (isConfirm) {
				tasksAPI.delete(task_id).then(() => {
					setTasks(tasks.filter((task) => task.id !== task_id));
				});
			}
			newTaskInputRef.current.focus();
		},
		[tasks],
	);

	const toogleTaskCompleted = useCallback(
		(task_id, isDone) =>
			tasksAPI.toogleComplite(task_id, isDone).then(() => {
				setTasks(
					tasks.map((task) => {
						if (task.id === task_id) {
							return { ...task, isDone };
						} else return task;
					}),
				);
			})[tasks],
	);

	const addTask = useCallback(() => {
		if (newTaskTitle.trim().length > 0) {
			const newTask = {
				title: newTaskTitle,
				isDone: false,
			};
			tasksAPI.add(newTask).then((addedTask) => {
				setTasks((prevState) => [...prevState, addedTask]);
				setNewTaskTitle("");
				setSearchQuery("");
				newTaskInputRef.current.focus();
			});
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
