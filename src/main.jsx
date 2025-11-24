import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/ThemeProvider";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import { FileProvider } from "./context/FileContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ThemeProvider>
      <FileProvider>
        <App />
      </FileProvider>
    </ThemeProvider>
  </AuthProvider>
);
