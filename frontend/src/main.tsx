import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import { ProviderApp } from "./provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProviderApp />
  </StrictMode>
);
