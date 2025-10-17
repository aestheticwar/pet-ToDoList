import { Field } from "./Field";

const SearchTaskForm = (props) => {
	const { onSearchInput } = props;

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
				onInput={(e) => onSearchInput(e.target.value)}
			/>
		</form>
	);
};

export { SearchTaskForm };
