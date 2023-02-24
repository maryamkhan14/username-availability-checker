import React, { useEffect } from "react";
import useAvailabilityContext from "../hooks/useAvailabilityContext";
import NetworkResult from "./NetworkResult";
import { Grid } from "@mui/material";
import "../styling/UsernameAvailabilityDetails.css";

const UsernameAvailabilityDetails = () => {
  const { results } = useAvailabilityContext();
  return (
    <Grid item container className="username-availability-details" gap={1}>
      {results &&
        Object.values(results).map((result) => {
          return <NetworkResult result={result} key={result.type} />;
        })}
    </Grid>
  );
};

export default UsernameAvailabilityDetails;
