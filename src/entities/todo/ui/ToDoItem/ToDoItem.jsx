import { memo, useContext } from "react";
import { TasksContext } from "../../model/TasksContext";
import styles from "./ToDoItem.module.scss";
import { highlightCaseInsensitive } from "@/shared/utils/highlight";
import { Link } from "@tanstack/react-router";

const ToDoItem = (props) => {
	const { title, isDone, className = "", id } = props;
	const {
		firstIncompleteTaskRef,
		firstIncompleteTaskId,
		deleteTask,
		toogleTaskCompleted,
		dissapearingTaskId,
		apearingTaskId,
		searchQuery,
	} = useContext(TasksContext);

	const hightlightedTitle = highlightCaseInsensitive(title, searchQuery);

	return (
		<li
			className={`
				${styles.toDoItem} 
				${className} 
				${dissapearingTaskId === id ? styles.isDisappearing : ""}
				${apearingTaskId === id ? styles.isAppearing : ""}
			`}
			ref={id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
		>
			<input
				className={styles.checkbox}
				id={id}
				type="checkbox"
				checked={isDone}
				onChange={(e) => toogleTaskCompleted(id, e.target.checked)}
			/>
			<label className={`${styles.label} visually-hidden`} htmlFor={id}>
				{title}
			</label>
			<Link to={`/tasks/${id}`} area-label="Task detail page">
				<span dangerouslySetInnerHTML={{ __html: hightlightedTitle }} />
			</Link>
			<button
				className={styles.deleteButton}
				aria-label="Delete"
				title="Delete"
				onClick={() => deleteTask(id)}
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15 5L5 15M5 5L15 15"
						stroke="#757575"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
		</li>
	);
};

export default memo(ToDoItem);
