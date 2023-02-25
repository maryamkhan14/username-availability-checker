const axios = require("axios");
const token = process.env.REDDIT_BEARER_TOKEN;

const obtainRedditProfile = async (username) => {
  const uri = `https://oauth.reddit.com/api/username_available?user=${username}`;
  try {
    // destructure data property from results
    const { data } = await axios.get(uri, {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": `UsernameAvailabilityChecker by /u/Worldly-Tart5506`,
      },
    });
    // if Reddit API returns errors, the data will contain JSON object
    return data.json ? { errors: data.json.errors } : { data };
    // return object contained inside data property
  } catch (e) {
    // catch Axios API errors
    return { errors: e.response.data.errors };
  }
};

const generateErrorMessages = ({ error, username }) => {
  return error
    ? {
        msg: `Reddit Service Error: ${error}. Try again.`,
      }
    : {
        msg: `Reddit: Username [${username}] is taken.`,
      };
};

const searchReddit = async (username) => {
  // Reddit's API returns "true" in data object if username is available, false otherwise
  const { data: userAvailable, errors } = await obtainRedditProfile(username);

  if (errors) {
    return {
      ...generateErrorMessages({ error: errors[0][1] }),
      status: 400,
      type: "REDDIT_DATA",
      username: username,
    };
  } else if (!userAvailable) {
    return {
      ...generateErrorMessages({ username }),
      status: 400,
      type: "REDDIT_DATA",
      username: username,
    };
  } else {
    return {
      msg: `Reddit: Username [${username}] is available!`,
      status: 200,
      type: "REDDIT_DATA",
      username: username,
    };
  }
};
module.exports = { searchReddit };
