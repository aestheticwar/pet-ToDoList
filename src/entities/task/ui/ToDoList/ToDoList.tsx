import { memo } from "react";
import ToDoItem from "../ToDoItem";
import { useTasks } from "@/entities/task/model/hooks/useTasks";
import styles from "./ToDoList.module.scss";

const ToDoList = () => {
	const { data: tasks, isPending } = useTasks({ user_id: 2 });

	if (isPending) {
		return <div className={styles.emptyMessage}>Loading...</div>;
	}

	if (!!!tasks || tasks.length === 0) {
		return <div className={styles.emptyMessage}>There are no tasks yet!</div>;
	}

	return (
		<ul className={styles.list}>
			{tasks.map((task) => (
				<ToDoItem key={task.id} className={styles.item} {...task} />
			))}
		</ul>
	);
};

export default memo(ToDoList);
