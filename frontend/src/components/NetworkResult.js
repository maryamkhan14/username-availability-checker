import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
const NetworkResult = ({ result }) => {
  const color = result.type.slice(0, result.type.indexOf("_")).toLowerCase();
  console.log(color);
  return (
    <Grid item container className="network-result">
      <Paper elevation={1} sx={{ backgroundColor: `primary.${color}` }}>
        <Typography variant="h5">result is {result.msg}</Typography>
      </Paper>
    </Grid>
  );
};

export default NetworkResult;
