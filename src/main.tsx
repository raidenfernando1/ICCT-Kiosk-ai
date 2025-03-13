import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/useAuth";
import "./index.css";
import Layout from "./pages/Layout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <Layout />
    </AuthProvider>
  </StrictMode>
);
