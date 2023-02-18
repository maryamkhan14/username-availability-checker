import React from "react";
import { Typography, Grid } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
const ProfileDetails = ({ profile }) => {
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
          <img src={profile.profile_image_url} alt="Profile" />
        </Grid>
        <Grid
          item
          display="flex"
          justifyContent="center"
          alignItems={"center"}
          gap={1}
        >
          <Typography variant="h5" color="secondary">
            {profile.username}
          </Typography>
          <p>{profile.verified && <VerifiedIcon />}</p>
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
          <Typography variant="body1">Name: {profile.name}</Typography>
          <Typography variant="body1">ID: {profile.id}</Typography>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center" gap={1}>
          <Typography>Description:</Typography>
          <Typography variant="body3">
            {profile.description.length > 1
              ? profile.description
              : "This user has not written a bio."}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileDetails;
