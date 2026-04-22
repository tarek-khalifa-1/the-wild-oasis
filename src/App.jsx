import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalSyles from "./styles/GlobalStyles";
import Toast from "./ui/Toast";
import Routing from "./Routing";
import { DarkModeProvider } from "./context/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalSyles />
        <Toast />
        <Routing />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
