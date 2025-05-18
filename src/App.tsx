import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import routes from "./router/routes";
import ThemeProvider from "./components/theme-provider";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={routes} />
        <ReactQueryDevtools />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
