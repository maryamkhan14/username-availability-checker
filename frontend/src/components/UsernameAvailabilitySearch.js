import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useState } from "react";
import useAvailabilityContext from "../hooks/useAvailabilityContext";

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
      if (JSON.parse(result).end) {
        await dispatch({ type: "SET_ACTIVE_SEARCH", payload: false });
      } else {
        await dispatch({
          type: `SET_${JSON.parse(result).type}`,
          payload: JSON.parse(result),
        });
      }
    };
    sse.onerror = async (e) => {
      await dispatch({ type: "SET_SSE_ERROR", payload: e });
      sse.close();
    };
    // reset username
    setUsername("");
    return () => {
      sse.close();
    };
  };

  const searchForUser = async (user) => {
    if (/^[A-Za-z0-9_]{1,15}$/.test(user)) {
      await executeSearch(user);
    } else {
      await dispatch({
        type: "SET_INPUT_ERROR",
        payload: "Search query contained illegal characters.",
      });
      await dispatch({ type: "SET_ACTIVE_SEARCH", payload: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch({ type: "SET_ACTIVE_SEARCH", payload: true });
    await dispatch({ type: "RESET_ERRORS", payload: null });
    await dispatch({ type: "RESET_RESULTS", payload: null });
    await searchForUser(username);
  };

  return (
    <Box
      component="form"
      className="usernameSearchForm"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
      gap={3}
    >
      <Box className="user-prompt" display="flex" gap={2} alignItems="center">
        <Typography variant="h4" color="secondary">
          Find out! 🚀
        </Typography>
      </Box>
      <Box className="user-input" display="flex" width="100%" gap={2}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          color="info"
          size="small"
          type="text"
          sx={{ input: { color: "text.secondary" } }}
          fullWidth
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required={true}
        />
        <Button
          type="submit"
          variant="contained"
          color="info"
          style={{ textTransform: "none" }}
          disabled={searchActive && true}
        >
          {" "}
          Search!{" "}
        </Button>
        {searchActive === true && (
          <CircularProgress
            color="secondary"
            size="25px"
            style={{ alignSelf: "center" }}
          />
        )}
      </Box>

      <Box className="info-availability">
        <Alert severity="info" icon={false}>
          This tool currently searches Twitter, Reddit, Twitch, and TikTok.
          Instagram and YouTube searches coming soon!
        </Alert>
      </Box>
      {errors && (
        <Box className="error">
          {sseError && (
            <Alert severity="error">
              An unknown error occurred while trying to search for your
              username. Please try again.
            </Alert>
          )}
          {inputError && (
            <Alert severity="error">
              Your search query contained illegal characters or was longer than
              15 characters. Please try again.
            </Alert>
          )}
        </Box>
      )}
    </Box>
  );
};

export default UsernameAvailabilitySearch;
