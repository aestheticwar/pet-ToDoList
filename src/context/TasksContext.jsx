import { createContext } from "react";
import useTasks from "../hooks/useTasks";
import useIncompliteTaskScroll from "../hooks/useIncompliteTaskScroll";

// eslint-disable-next-line react-refresh/only-export-components
export const TasksContext = createContext({});

export const TasksProvider = ({ children }) => {
	const {
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
	} = useTasks();

	const { firstIncompleteTaskRef, firstIncompleteTaskId } =
		useIncompliteTaskScroll(tasks);

	return (
		<TasksContext.Provider
			value={{
				tasks,
				filteredTasks,
				firstIncompleteTaskRef,
				firstIncompleteTaskId,
				deleteTask,
				deleteAllTasks,
				toogleTaskCompleted,
				newTaskTitle,
				setNewTaskTitle,
				searchQuery,
				setSearchQuery,
				newTaskInputRef,
				addTask,
			}}
		>
			{children}
		</TasksContext.Provider>
	);
};
