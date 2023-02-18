import { Grid, Typography } from "@mui/material";
const Navbar = () => {
  return (
    <Grid
      item
      className="navbarBox"
      xs={12}
      display="flex"
      flexDirection="column-reverse"
      alignItems="center"
      container
    >
      <Typography variant="h3">Twitter Profile Grab</Typography>
    </Grid>
  );
};
export default Navbar;
