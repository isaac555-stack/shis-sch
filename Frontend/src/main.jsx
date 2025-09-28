// index.js or App.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme";

import "@fontsource/montserrat/700.css"; // Montserrat bold for headings
import "@fontsource/poppins/100.css"; // Roboto regular for body
import "@fontsource/roboto/500.css"; // Roboto medium for optional use

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
