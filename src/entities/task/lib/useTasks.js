import {
	useState,
	useCallback,
	useMemo,
	useRef,
	useEffect,
	useReducer,
} from "react";

const useTasks = () => {
	const tasks = [];
	const [searchQuery, setSearchQuery] = useState("");
	const [dissapearingTaskId, setDissapearingTaskId] = useState(null);
	const [apearingTaskId, setApearingTaskId] = useState(null);

	const newTaskInputRef = useRef(null);

	const deleteTask = useCallback(
		(task_id) => {
			const deleteTaskName = tasks.find((task) => task.id === task_id).title;
			const isConfirm = confirm(
				`Are you sure you want to delete task with name: ${deleteTaskName}?`,
			);
			if (isConfirm) {
			}
			newTaskInputRef.current.focus();
		},
		[tasks],
	);

	const toogleTaskCompleted = useCallback((task_id, isDone) =>
		// tasksAPI.toogleComplite(task_id, isDone).then(() => {
		// 	dispatch({ type: "TOGGLE_COMPLETE", id: task_id, isDone });
		// }),
		[],
	);

	const addTask = useCallback((newTaskTitle, clearTitle) => {
		if (newTaskTitle.trim().length > 0) {
			const newTask = {
				title: newTaskTitle,
				isDone: false,
			};
			// tasksAPI.add(newTask).then((addedTask) => {
			// 	dispatch({ type: "ADD", task: addedTask });
			// 	clearTitle();
			// 	setSearchQuery("");
			// 	newTaskInputRef.current.focus();
			// 	setApearingTaskId(addedTask.id);
			// 	setTimeout(() => {
			// 		setApearingTaskId(null);
			// 	}, 400);
			// });
		}
	}, []);

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
		toogleTaskCompleted,
		searchQuery,
		setSearchQuery,
		newTaskInputRef,
		addTask,
		dissapearingTaskId,
		apearingTaskId,
	};
};

export default useTasks;
