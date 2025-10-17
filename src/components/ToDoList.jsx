import { ToDoItem } from "./ToDoItem";

const ToDoList = (props) => {
	const { tasks = [], onDeleteTaskButtonClick, onTaskCompletedChange} = props;
	const hasTasks = tasks.length > 0;

	if (!hasTasks) {
		return <div className="todo__empty-message"></div>;
	}

	return (
		<ul className="todo__list">
			{tasks.map((task) => (
				<ToDoItem
					key={task.id}
					className="todo__item"
					onDeleteTaskButtonClick={onDeleteTaskButtonClick}
					onTaskCompletedChange={onTaskCompletedChange}
					{...task}
				/>
			))}
		</ul>
	);
};

export { ToDoList };
