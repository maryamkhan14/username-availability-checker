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
      display="flex"
      flexDirection="row"
      justifySelf="center"
      justifyContent="space-between"
      rowSpacing={3}
      columnSpacing={3}
      container
    >
      <Grid
        item
        lg={7}
        className="username-availability-search"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
      >
        <UsernameAvailabilitySearch />
      </Grid>

      <Grid item lg={5} display="flex">
        <UsernameAvailabilityDetails />
      </Grid>
    </Grid>
  );
};

export default Home;
