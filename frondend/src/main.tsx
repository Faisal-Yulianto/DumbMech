import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import dumbmerchTheme from "./theme/theme.ts";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Provider } from 'react-redux';
import store from './store/store.ts';
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={dumbmerchTheme}>
    <Provider store={store}>
      <CssBaseline />
      <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
