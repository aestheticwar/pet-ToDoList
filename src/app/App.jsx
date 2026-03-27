import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/shared/config/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles";

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />;
		</QueryClientProvider>
	);
};

export default App;
