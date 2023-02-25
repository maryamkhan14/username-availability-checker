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
        <Grid item xs={12} container display="flex"></Grid>
        <Grid item xs={12} container display="flex">
          <Navbar />
        </Grid>
        <Grid
          item
          xs={12}
          container
          display="flex"
          className="pages"
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
          className="pages"
          justifyContent={"center"}
        >
          <Footer />
        </Grid>

        <Grid item xs={12} container display="flex"></Grid>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
