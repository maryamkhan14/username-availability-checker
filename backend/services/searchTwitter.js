const axios = require("axios");
const token = process.env.TWITTER_BEARER_TOKEN;

const obtainTwitterProfile = async (username) => {
  const uri = `https://api.twitter.com/2/users/by/username/${username}`;
  try {
    // destructure data property from results
    const { data } = await axios.get(uri, {
      headers: {
        "User-Agent": "Twitter Profile Grab",
        Authorization: `Bearer ${token}`,
      },
    });
    // return object contained inside data property (will contain user details if matching user is found, errors object otherwise)
    return { ...data };
  } catch (e) {
    // catch Axios errors
    return { errors: e.response.data.errors };
  }
};
const generateErrorMessages = (error) => {
  return error.message
    ? {
        // AxiosError objects' error message property is called message
        msg: `Twitter Service Error: ${error.message}. Try again.`,
      }
    : {
        // Twitter API error results do not have that array, and their message property is called detail
        msg: `Twitter: ${error.detail}`,
      };
};
const searchTwitter = async (username) => {
  const { data, errors } = await obtainTwitterProfile(username);
  if (errors && errors[0].title && errors[0].title === "Not Found Error") {
    return {
      msg: `Twitter: Username [${username}] is available!`,
      status: 200,
      type: "TWITTER_DATA",
      username: username,
    };
  } else if (errors) {
    return {
      ...generateErrorMessages(errors[0]),
      status: 400,
      type: "TWITTER_DATA",
      username: username,
    };
  } else if (data) {
    return {
      ...generateErrorMessages({
        detail: `Username [${username}] is taken.`,
      }),
      status: 400,
      type: "TWITTER_DATA",
      username: username,
    };
  }
};
module.exports = { searchTwitter };
