import { useRef } from "react";

const useIncompliteTaskScroll = (tasks) => {
	const firstIncompleteTaskRef = useRef(null);
	const firstIncompleteTaskId = tasks.find((task) => task.isDone === false)?.id;

	return {
		firstIncompleteTaskId,
		firstIncompleteTaskRef,
	};
};

export default useIncompliteTaskScroll;
