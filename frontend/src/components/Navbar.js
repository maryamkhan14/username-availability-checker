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
      textAlign="center"
      container
    >
      <Typography variant="h3">Is your dream username available?</Typography>
    </Grid>
  );
};
export default Navbar;
