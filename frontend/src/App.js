import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Grid } from "@mui/material";
// pages and components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Grid item xs={12} container display="flex" gap={3}>
        <Grid
          item
          xs={12}
          container
          display="flex"
          id="navbar-container"
          justifyContent={"center"}
        >
          <Navbar />
        </Grid>
        <Grid
          item
          xs={12}
          container
          display="flex"
          id="main-content-container"
          justifyContent={"center"}
        >
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Grid>
        <Grid
          item
          xs={12}
          container
          display="flex"
          id="footer-container"
          justifyContent={"center"}
        >
          <Footer />
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
