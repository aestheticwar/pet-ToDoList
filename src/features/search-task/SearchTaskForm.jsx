import { useContext } from "react";
import { Field } from "@/shared/ui/Field";
import { TasksContext } from "@/entities/todo";

const SearchTaskForm = ({ styles }) => {
	const { searchQuery, setSearchQuery } = useContext(TasksContext);

	const onSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<form className={styles.form} onSubmit={(e) => onSubmit(e)}>
			<Field
				className={styles.field}
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
