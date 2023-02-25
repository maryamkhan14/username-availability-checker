import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import themeGlobal from "./styling/themes";
import { ThemeProvider, CssBaseline, Grid } from "@mui/material";
import { AvailabilityContextProvider } from "./context/AvailabilityContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AvailabilityContextProvider>
    <ThemeProvider theme={themeGlobal}>
      <CssBaseline />
      <Grid
        container
        className="app-container"
        display="flex"
        flex="1 0 100%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <App />
      </Grid>
    </ThemeProvider>
  </AvailabilityContextProvider>
);
