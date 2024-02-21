import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import adminQueryClient from "./api/adminQueryClient";
import { theme } from "./constants/theme";
import AuthUserProvider from "./context/AuthUserProvider";
import MenuContextProvider from "./context/MenuContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={adminQueryClient}>
        <AuthUserProvider>
          <MenuContextProvider>
            <App />
          </MenuContextProvider>
        </AuthUserProvider>

        <ToastContainer
          position="top-right"
          autoClose={1500}
          closeOnClick
          theme="light"
        />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
