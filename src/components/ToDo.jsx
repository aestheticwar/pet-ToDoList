import { AddTaskForm } from "./AddTaskForm";
import { SearchTaskForm } from "./SearchTaskForm";
import { ToDoInfo } from "./ToDoInfo";
import { ToDoList } from "./ToDoList";

const ToDo = () => {
	const tasks = [
		{ id: "task-1", title: "Task 1", isDone: false },
		{ id: "task-2", title: "Task 2", isDone: true },
		{ id: "task-3", title: "Task 3", isDone: false },
	];

	const deleteAllTasks = () => {
		console.log("Delete all tasks");
	};

	const deleteTask = (task_id) => {
		console.log(`Delete task ${task_id}`);
	};

	const togleTaskCompleted = (task_id, isDone) => {
		console.log(`Togle task ${task_id}`);
	};

	const filterTasks = (query) => {
		console.log(`Filter tasks by ${query}`);
	};

	const addTask = () => {
		console.log(`Add task`);
	};

	const total = tasks.length;
	const done = tasks.filter((task) => task.isDone).length;

	return (
		<div className="todo">
			<h1 className="todo__title">To Do List</h1>
			<AddTaskForm addTask={addTask}/>
			<SearchTaskForm onSearchInput={filterTasks} />
			<ToDoInfo
				total={total}
				done={done}
				onDeleteAllButtonClick={deleteAllTasks}
			/>
			<ToDoList
				tasks={tasks}
				onDeleteTaskButtonClick={deleteTask}
				onTaskCompletedChange={togleTaskCompleted}
			/>
		</div>
	);
};

export { ToDo };
