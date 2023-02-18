import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import themeGlobal from "./styling/themes";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={themeGlobal}>
    <CssBaseline />
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
    >
      <App />
    </Box>
  </ThemeProvider>
);
