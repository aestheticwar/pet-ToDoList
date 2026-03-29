import { ToDo } from "@/widgets/ToDo";
import { TasksProvider } from "@/entities/task";

const TasksPage = () => {
	return (
		<TasksProvider>
			<ToDo />
		</TasksProvider>
	);
};

export default TasksPage;
