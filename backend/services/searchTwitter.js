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
    // return object contained inside data property
    return { data };
  } catch (e) {
    return { errors: e.response.data.errors };
  }
};
const generateErrorMessages = (error) => {
  console.log(error);
  return error.message
    ? {
        // AxiosError objects' error message property is called message
        msg: `Error: ${error.message}. Try again.`,
      }
    : {
        // Twitter API error results do not have that array, and their message property is called detail
        msg: `Error: ${error.detail} Try again.`,
      };
};
const searchTwitter = async (username) => {
  const results = await obtainTwitterProfile(username);
  return results;
};
module.exports = { searchTwitter };
