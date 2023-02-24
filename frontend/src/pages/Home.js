import { Grid } from "@mui/material";
// components
import UsernameAvailabilityDetails from "../components/UsernameAvailabilityDetails";
import UsernameAvailabilitySearch from "../components/UsernameAvailabilitySearch";

const Home = () => {
  return (
    <Grid
      item
      className="home"
      width="85vw"
      height="100%"
      display="flex"
      flexDirection="row"
      justifySelf="center"
      justifyContent="space-between"
      sx={{ backgroundColor: "primary.main" }}
      p={3}
      container
    >
      <Grid
        item
        lg={5}
        className="username-availability-search"
        display="flex"
        justifyContent="flex-start"
        pr={3}
      >
        <UsernameAvailabilitySearch />
      </Grid>

      <Grid item lg={6} display="flex" sx={{ backgroundColor: "primary.alt" }}>
        <UsernameAvailabilityDetails />
      </Grid>
    </Grid>
  );
};

export default Home;
