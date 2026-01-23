import { useContext } from "react";
import { Field } from "./Field";
import { TasksContext } from "../context/TasksContext";

const SearchTaskForm = () => {
	const { searchQuery, setSearchQuery } = useContext(TasksContext);

	const onSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<form className="todo__form" onSubmit={(e) => onSubmit(e)}>
			<Field
				className="todo__field"
				label="Search task"
				id="search-task"
				type="search"
				value={searchQuery}
				onInput={(e) => setSearchQuery(e.target.value)}
			/>
		</form>
	);
};

export { SearchTaskForm };
