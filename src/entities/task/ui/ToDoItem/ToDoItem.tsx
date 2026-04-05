import { memo, useContext, useState } from "react";
import { TasksContext } from "../../lib/TasksContext";
import { useDeleteTask } from "../../model/hooks/useDeleteTask";
import styles from "./ToDoItem.module.scss";
import { highlightCaseInsensitive } from "@/shared/utils/highlight";
import { Task } from "../../model";
import { useUpdateTask } from "../../model/hooks/useUpdateTask";
import { TaskModal } from "../Modal";
import { Button } from "@/shared/ui/Button";

interface ToDoItemProps extends Task {
	className?: string;
}

const ToDoItem = (props: ToDoItemProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const { title, completed, className = "", id, description } = props;
	const { mutate: deleteTask, isPending: isDeletePending } = useDeleteTask();
	const { mutate: updateTask, isPending: isUpdatePending } = useUpdateTask();
	const { searchQuery } = useContext(TasksContext);

	const handleDeleteTask = (id: number) => {
		deleteTask(id);
	};

	const hightlightedTitle = highlightCaseInsensitive(title, searchQuery);

	const hanleToogleComplite = (checked: boolean) => {
		console.log({ checked });
		updateTask({ id, updatedFields: { completed: checked } });
	};

	return (
		<>
			<li
				className={`
				${styles.toDoItem} 
				${className} 
			`}
			>
				<input
					className={styles.checkbox}
					id={id.toString()}
					type="checkbox"
					checked={completed}
					onChange={(e) => hanleToogleComplite(e.target.checked)}
					disabled={isUpdatePending}
				/>
				<label
					className={`${styles.label} visually-hidden`}
					htmlFor={id.toString()}
				>
					{title}
				</label>
				<Button onClick={() => setOpen(true)}>
					<span dangerouslySetInnerHTML={{ __html: hightlightedTitle }} />
				</Button>
				<button
					className={styles.deleteButton}
					aria-label="Delete"
					title="Delete"
					onClick={() => handleDeleteTask(id)}
					disabled={isDeletePending}
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

			<TaskModal
				id={id}
				open={open}
				setOpen={setOpen}
				title={title}
				description={description}
			/>
		</>
	);
};

export default memo(ToDoItem);
