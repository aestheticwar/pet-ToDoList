import { memo, useMemo } from "react";
import { useTasks } from "@/entities/task/model/hooks/useTasks";
import styles from "./ToDoInfo.module.scss";

const ToDoInfo = () => {
	const { data: tasks } = useTasks({ user_id: 2 });

	const total = tasks?.length;
	const hasTasks = total > 0;
	const done = useMemo(() => {
		return tasks?.filter((task) => task.completed).length;
	}, [tasks]);
	return (
		<div className={styles.info}>
			<div className={styles.totalTasks}>
				Done {done} from {total}
			</div>
			{hasTasks && (
				<button className={styles.deleteAllButton} type="button">
					Delete all
				</button>
			)}
		</div>
	);
};

export default memo(ToDoInfo);
