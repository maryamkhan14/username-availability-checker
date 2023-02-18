import React from "react";
import { Grid, Alert, IconButton, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <Grid item id="footer" display="flex" alignItems="flex-start">
      <Grid
        item
        id="creation-and-social"
        display="flex"
        alignItems="center"
        gap={2}
      >
        <Grid item id="creation-info">
          <Alert variant="outlined" severity="info" icon={false}>
            Created with Express and React.
          </Alert>
        </Grid>
        <Grid item id="github-profile">
          <IconButton aria-label="github" size="large">
            <Link href="https://github.com/maryamkhan14">
              <GitHubIcon color="info" fontSize="large" />
            </Link>
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
