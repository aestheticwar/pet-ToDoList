import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/shared/routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/config/TanstackQuery";
import "./styles";

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />;
		</QueryClientProvider>
	);
};

export default App;
