import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalSyles from "./styles/GlobalStyles";
import Toast from "./ui/Toast";
import Routing from "./Routing";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalSyles />
      <Toast />
      <Routing />
    </QueryClientProvider>
  );
}

export default App;
