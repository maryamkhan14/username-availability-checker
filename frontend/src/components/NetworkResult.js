import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import useAvailabilityContext from "../hooks/useAvailabilityContext";

const NetworkResult = ({ result }) => {
  const { searchActive } = useAvailabilityContext();
  if (result["status"]) {
    const color = result.type.slice(0, result.type.indexOf("_")).toLowerCase();
    return (
      <Grid item container className="network-result">
        <Paper
          elevation={1}
          sx={{ backgroundColor: `primary.${color}` }}
          className="network-result card"
        >
          <Grid item container className="network-result details" gap={1}>
            {(result.status === 200 && (
              <CheckCircleOutlineIcon fontSize="large" />
            )) || <CancelOutlinedIcon fontSize="large" />}
            <Typography variant="h7" className="result-message">
              {result.msg}
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    );
  } else {
    return (
      <Grid item container className="network-result">
        <Paper
          elevation={1}
          sx={{ backgroundColor: `primary.card` }}
          className="network-result card"
        >
          <Grid item container className="network-result details" gap={1}>
            <Typography
              variant="h7"
              color="text.secondary"
              className="result-message"
            >
              {(searchActive && "Loading...") || "Waiting for a username..."}
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    );
  }
};

export default NetworkResult;
