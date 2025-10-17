import { Button } from "./Button";
import { Field } from "./Field";

const AddTaskForm = (props) => {
	const { addTask } = props;

	const onSubmit = (e) => {
		e.preventDefault();
		addTask();
	};
	return (
		<form className="todo__form" onSubmit={(e) => onSubmit(e)}>
			<Field className="todo__field" label="New task title" id="new-task" />
			<Button type="submit">Add</Button>
		</form>
	);
};

export { AddTaskForm };
