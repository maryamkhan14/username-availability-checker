import { Grid } from "@mui/material";
// components
import UsernameAvailabilityDetails from "../components/UsernameAvailabilityDetails";
import UsernameAvailabilitySearch from "../components/UsernameAvailabilitySearch";

const Home = () => {
  return (
    <Grid
      item
      className="home"
      width="80vw"
      height="100%"
      display="flex"
      flexDirection="row"
      justifySelf="center"
      justifyContent="space-between"
      p={3}
      sx={{ backgroundColor: "primary.main" }}
      container
    >
      <Grid
        item
        lg={8}
        className="profileForm"
        display="flex"
        justifyContent="flex-start"
        pr={1}
      >
        <UsernameAvailabilitySearch />
      </Grid>

      <Grid
        item
        lg={4}
        className="profileDetails"
        display="flex"
        sx={{ backgroundColor: "primary.alt" }}
      >
        <UsernameAvailabilityDetails />
      </Grid>
    </Grid>
  );
};

export default Home;
