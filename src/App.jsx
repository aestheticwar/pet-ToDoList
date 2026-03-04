import Router from "./Router";
import TasksPage from "./pages/TasksPage";
import TaskPage from "./pages/TaskPage";

const App = () => {
	const routes = {
		"/": TasksPage,
		"/tasks/:id": TaskPage,
		"*": () => (
			<div>
				<h2>404 Page not found</h2>
			</div>
		),
	};
	return <Router routes={routes} />;
};

export default App;
