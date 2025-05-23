import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import "./index.css";

const queryClient = new QueryClient();

// MSW를 조건부로 실행
const enableMocking = async () => {
  if (import.meta.env.VITE_MOCK_MODE !== "true") {
    return;
  }

  const { worker } = await import("./mocks/browser");
  console.log("%c✅ MSW started (Mock Mode)", "color: green");
  return worker.start();
};

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>,
  );
});
