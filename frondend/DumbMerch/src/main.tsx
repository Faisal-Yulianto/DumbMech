import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import dumbmerchTheme from "./theme/theme.ts";
import { ThemeProvider, CssBaseline } from "@mui/material";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={dumbmerchTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
