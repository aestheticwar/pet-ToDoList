interface Task {
	id: number;
	version: number;
	title: string;
	description: string;
	completed: boolean;
	created_at: string;
	completed_at: string | null;
	author_user_id: number;
}

export { Task };
