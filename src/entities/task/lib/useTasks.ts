import { useState } from "react";

const useTasks = () => {
	const [searchQuery, setSearchQuery] = useState<string>("");

	return { searchQuery, setSearchQuery };
};

export default useTasks;
