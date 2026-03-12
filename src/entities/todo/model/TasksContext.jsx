import { createContext, useMemo } from "react";
import useTasks from "./useTasks";
import useIncompliteTaskScroll from "./useIncompliteTaskScroll";

// eslint-disable-next-line react-refresh/only-export-components
export const TasksContext = createContext({});

export const TasksProvider = ({ children }) => {
	const {
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
	} = useTasks();

	const { firstIncompleteTaskRef, firstIncompleteTaskId } =
		useIncompliteTaskScroll(tasks);

	const value = useMemo(
		() => ({
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
			firstIncompleteTaskRef,
			firstIncompleteTaskId,
		}),
		[
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
			firstIncompleteTaskRef,
			firstIncompleteTaskId,
		],
	);

	return (
		<TasksContext.Provider value={value}>{children}</TasksContext.Provider>
	);
};
