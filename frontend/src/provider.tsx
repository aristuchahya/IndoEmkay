import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./hooks/store";
import App from "./App.tsx";
import { Toaster } from "sonner";
export function ProviderApp() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </QueryClientProvider>
  );
}
