import React from "react";
import { Typography, Grid } from "@mui/material";
import { useEffect } from "react";
import useAvailabilityContext from "../hooks/useAvailabilityContext";

const UsernameAvailabilityDetails = () => {
  const { results } = useAvailabilityContext();
  useEffect(() => {
    let { twitterData, twitchData, tiktokData, redditData } = results;
    console.log(twitterData, twitchData, tiktokData, redditData);
  }, [results]);
  return (
    <Grid
      item
      container
      className="profile-details"
      display="flex"
      alignContent={"center"}
    >
      <Grid
        item
        xs={12}
        display="flex"
        justifyContent="center"
        alignItems={"center"}
        gap={1}
        mt={2}
        container
      >
        <Grid item>
          <img src="/" alt="Profile" />
        </Grid>
        <Grid
          item
          display="flex"
          justifyContent="center"
          alignItems={"center"}
          gap={1}
        >
          <Typography variant="h5" color="secondary">
            Username placeholder
          </Typography>
          <p>Verified placeholder</p>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        display="flex"
        justifyContent="space-around"
        alignItems={"center"}
        gap={3}
        p={3}
        container
      >
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="space-around"
          columnGap={2}
        >
          <Typography variant="body1">Name: </Typography>
          <Typography variant="body1">ID: </Typography>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center" gap={1}>
          <Typography>Description:</Typography>
          <Typography variant="body3">
            This user has not written a bio."
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UsernameAvailabilityDetails;
