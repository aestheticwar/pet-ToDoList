import {
	useState,
	useCallback,
	useMemo,
	useRef,
	useEffect,
	useReducer,
} from "react";
import tasksAPI from "../../../shared/api/tasks";

const TasksReducer = (state, action) => {
	switch (action.type) {
		case "SET_ALL": {
			return Array.isArray(action.tasks) ? action.tasks : state;
		}

		case "ADD": {
			return [...state, action.task];
		}

		case "TOGGLE_COMPLETE": {
			const { id, isDone } = action;
			return state.map((task) => {
				return task.id === id ? { ...task, isDone } : task;
			});
		}

		case "DELETE": {
			return state.filter((task) => task.id !== action.id);
		}

		case "DELETE_ALL": {
			return [];
		}

		default: {
			return state;
		}
	}
};

const useTasks = () => {
	const [tasks, dispatch] = useReducer(TasksReducer, []);
	const [searchQuery, setSearchQuery] = useState("");
	const [dissapearingTaskId, setDissapearingTaskId] = useState(null);
	const [apearingTaskId, setApearingTaskId] = useState(null);

	const newTaskInputRef = useRef(null);

	useEffect(() => {
		tasksAPI.getAll().then((tasks) => {
			dispatch({ type: "SET_ALL", tasks });
		});
		newTaskInputRef.current.focus();
	}, []);

	const deleteAllTasks = useCallback(() => {
		const isConfirm = confirm("Are you sure you want to delete tasks?");

		if (isConfirm) {
			tasksAPI.deleteAll(tasks).then(() => dispatch({ type: "DELETE_ALL" }));
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
					setDissapearingTaskId(task_id);
					setTimeout(() => {
						dispatch({ type: "DELETE", id: task_id });
						setDissapearingTaskId(null);
					}, 400);
				});
			}
			newTaskInputRef.current.focus();
		},
		[tasks],
	);

	const toogleTaskCompleted = useCallback(
		(task_id, isDone) =>
			tasksAPI.toogleComplite(task_id, isDone).then(() => {
				dispatch({ type: "TOGGLE_COMPLETE", id: task_id, isDone });
			}),
		[],
	);

	const addTask = useCallback((newTaskTitle, clearTitle) => {
		if (newTaskTitle.trim().length > 0) {
			const newTask = {
				title: newTaskTitle,
				isDone: false,
			};
			tasksAPI.add(newTask).then((addedTask) => {
				dispatch({ type: "ADD", task: addedTask });
				clearTitle();
				setSearchQuery("");
				newTaskInputRef.current.focus();
				setApearingTaskId(addedTask.id);
				setTimeout(() => {
					setApearingTaskId(null);
				}, 400);
			});
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
		deleteAllTasks,
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
