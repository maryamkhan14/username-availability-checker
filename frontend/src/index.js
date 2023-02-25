import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import themeGlobal from "./styling/themes";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { AvailabilityContextProvider } from "./context/AvailabilityContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AvailabilityContextProvider>
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
  </AvailabilityContextProvider>
);
