import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/shared/routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/config/TanstackQuery";
import "./styles";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default App;
