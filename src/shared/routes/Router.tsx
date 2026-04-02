import TasksPage from "@/pages/TasksPage";
import {
	createRootRoute,
	createRoute,
	createRouter,
} from "@tanstack/react-router";

const rootRoute = createRootRoute();

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: () => <TasksPage />,
});

const notFoundRoute = createRootRoute({
	getParentRoute: () => rootRoute,
	path: "*",
	component: () => (
		<div>
			<h2>404 Page not found</h2>
		</div>
	),
});
const routeTree = rootRoute.addChildren([indexRoute, notFoundRoute]);

export const router = createRouter({ routeTree });
