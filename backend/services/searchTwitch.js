const axios = require("axios");
const clientId = process.env.TWITCH_CLIENT_ID;
const token = process.env.TWITCH_BEARER_TOKEN;

const obtainTwitchProfile = async (username) => {
  const uri = `https://api.twitch.tv/helix/users?login=${username}`;
  try {
    // destructure data property from results
    const { data } = await axios.get(uri, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Client-Id": `${clientId}`,
      },
    });

    // return object contained inside data property (will be empty if no matching user is found)
    return { ...data };
  } catch (e) {
    return { errors: e.response.data.errors };
  }
};

const generateErrorMessages = ({ login: username, error, message }) => {
  return error
    ? {
        // Error in grabbing data
        msg: `${message}. Try again.`,
      }
    : {
        // Twitch username already exists
        msg: `The Twitch username [${username}] is taken.`,
      };
};
const searchTwitch = async (username) => {
  // Twitch API returns profile data in data object if user already exists, empty object if not
  const { data, errors } = await obtainTwitchProfile(username);

  if (errors) {
    return {
      ...generateErrorMessages(errors),
      status: 400,
      type: "TWITCH_DATA",
      username: username,
    };
  } else if (data && data.length > 0) {
    // if Twitch profile exists
    return {
      ...generateErrorMessages(data[0]),
      status: 400,
      type: "TWITCH_DATA",
      username: username,
    };
  } else {
    return {
      msg: `The Twitch username [${username}] is available!`,
      status: 200,
      type: "TWITCH_DATA",
      username: username,
    };
  }
};
module.exports = { searchTwitch };
