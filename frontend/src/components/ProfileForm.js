import React from "react";
import {
  Box,
  Alert,
  Button,
  Typography,
  CircularProgress,
  TextField,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useState, useEffect } from "react";

const ProfileForm = ({ handleProfileChange }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchForUser = async (user) => {
    // store result of fetch
    const searchResult = await fetch(
      `https://username-availability-checker-backend.onrender.com/search/${user}`
    );

    let { twitterData, twitchData, redditData, tiktokData } =
      await searchResult.json();
    console.log(twitterData);
    console.log(twitchData);
    console.log(redditData);
    console.log(tiktokData);

    // handle error in fetch result
    if (!twitterSearchResult.ok) {
      setError(twitterSearchResultJSON.errorMsg);
      setLoading(false);
    }

    // handle successful fetch
    if (twitterSearchResult.ok) {
      // invoke prop function with profile data
      handleProfileChange(twitterSearchResultJSON.profile);

      // reset state variables
      setUsername("");
      setError(null);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await searchForUser(username);
  };

  // obtain profile for username "twitter" when page first loads
  useEffect(() => {
    searchForUser("twitter");
  }, []);

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
      <Typography variant="h4" color="secondary">
        Search for a Twitter profile.
      </Typography>

      <Box className="usernameInput" display="flex" gap={2} alignItems="center">
        <label>Enter a username:</label>
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
        >
          {" "}
          Submit{" "}
        </Button>

        {loading && (
          <CircularProgress
            color="secondary"
            size="25px"
            style={{ alignSelf: "center" }}
          />
        )}
      </Box>
      <Box className="error">
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Box>
  );
};

export default ProfileForm;
