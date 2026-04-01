import { createContext, useMemo } from "react";
import useTasks from "./useTasks";

export const TasksContext = createContext({});

export const TasksProvider = ({ children }) => {
	const { searchQuery, setSearchQuery } = useTasks();

	const value = useMemo(
		() => ({
			searchQuery,
			setSearchQuery,
		}),
		[searchQuery, setSearchQuery],
	);

	return (
		<TasksContext.Provider value={value}>{children}</TasksContext.Provider>
	);
};
