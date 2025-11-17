import { memo } from "react";

import ToDoItem from "./ToDoItem";

const ToDoList = (props) => {
	const {
		tasks = [],
		filteredTasks,
		onDeleteTaskButtonClick,
		onTaskCompletedChange,
		firstIncompleteTaskId,
		firstIncompleteTaskRef
	} = props;
	const hasTasks = tasks.length > 0;
	const isEmptyFilteredTasks = filteredTasks?.length === 0;

	if (!hasTasks) {
		return <div className="todo__empty-message">There are no tasks yet!</div>;
	}

	if (hasTasks && isEmptyFilteredTasks) {
		return <div className="todo__empty-message">Tasks not found!</div>;
	}

	return (
		<ul className="todo__list">
			{(filteredTasks ?? tasks).map((task) => (
				<ToDoItem
					key={task.id}
					className="todo__item"
					onDeleteTaskButtonClick={onDeleteTaskButtonClick}
					onTaskCompletedChange={onTaskCompletedChange}
					ref={task.id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
					{...task}
				/>
			))}
		</ul>
	);
};

export default memo(ToDoList);
