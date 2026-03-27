import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/shared/config/Router";
import "./styles";

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
