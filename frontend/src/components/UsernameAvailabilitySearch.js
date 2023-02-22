import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useState } from "react";
import useAvailabilityContext from "../hooks/useAvailabilityContext";
import { isWhitelisted } from "validator";

const UsernameAvailabilitySearch = () => {
  const { searchActive, errors, dispatch } = useAvailabilityContext();
  const { inputError, sseError } = errors;
  const [username, setUsername] = useState("");

  const executeSearch = async (user) => {
    // use global state to define errors and success
    const sse = new EventSource(
      `https://username-availability-checker-backend.onrender.com/search/${user}`,
      { withCredentials: false }
    );
    sse.onmessage = async ({ data: result }) => {
      await dispatch({
        type: `SET_${JSON.parse(result).type}`,
        payload: JSON.parse(result),
      });
    };
    sse.onerror = async (e) => {
      await dispatch({ type: "SET_SSE_ERROR", payload: e });
      sse.close();
    };

    // reset username
    setUsername("");
    return () => sse.close();
  };

  const searchForUser = async (user) => {
    if (isWhitelisted(user, "^[A-Za-z0-9_]{1,15}$")) {
      await executeSearch(user);
    } else {
      await dispatch({
        type: "SET_INPUT_ERROR",
        payload: "Search query contained illegal characters.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch({ type: "SET_SEARCH_ACTIVE", payload: true });
    await searchForUser(username);
    await dispatch({ type: "SET_SEARCH_INACTIVE", payload: false });
  };

  return (
    <Box
      component="form"
      className="searchProfile"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
      gap={3}
    >
      <Box className="usernameInput" display="flex" gap={2} alignItems="center">
        <Typography variant="h5" color="secondary">
          Find out!
        </Typography>
        {/* the reason there is a value prop is so that later on, if the username textbox's value is modified from elsewhere e.g. using a clear button, then the state should update too*/}
        <TextField
          id="outlined-basic"
          variant="outlined"
          color="info"
          size="small"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required={true}
        />
      </Box>

      <Box className="usernameSubmit" display="flex" gap={2}>
        <Button
          type="submit"
          variant="contained"
          color="info"
          style={{ textTransform: "none" }}
          endIcon={<TwitterIcon />}
          disabled={searchActive && true}
        >
          {" "}
          Submit{" "}
        </Button>

        {searchActive && (
          <CircularProgress
            color="secondary"
            size="25px"
            style={{ alignSelf: "center" }}
          />
        )}
      </Box>
      <Box className="error">
        {sseError && (
          <Alert severity="error">
            An unknown error occurred while trying to search for your username.
            Please try again.
          </Alert>
        )}
        {inputError && (
          <Alert severity="error">
            Your search query contained illegal characters or was longer than 15
            characters. Please try again.
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default UsernameAvailabilitySearch;
