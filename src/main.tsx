import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import customTheme from "./components/global-styles/GlobalStyle.tsx";
import { ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { GlobalContextProvider } from "./context/GlobalContext.tsx";
import "react-toastify/dist/ReactToastify.css";
import CssBaseline from "@mui/material/CssBaseline";
import { EmployeeContextProvider } from "./context/EmployeeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />

      <GlobalContextProvider>
        <EmployeeContextProvider>
          <App /> {/* Render your routes within the context providers */}
        </EmployeeContextProvider>
      </GlobalContextProvider>
      <ToastContainer
        position="top-right"
        hideProgressBar={true}
        autoClose={3000}
      />
    </ThemeProvider>
  </React.StrictMode>
);
3;
