const axios = require("axios");
const token = process.env.TWITTER_BEARER_TOKEN;
const fields = "description,profile_image_url,verified";

const obtainTwitterProfile = async (username) => {
  const uri = `https://api.twitter.com/2/users/by/username/${username}?user.fields=${fields}`;
  try {
    // destructure data property from results
    const { data } = await axios.get(uri, {
      headers: {
        "User-Agent": "Twitter Profile Grab",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    // return object contained inside data property
    return { ...data };
  } catch (e) {
    return { errors: e.response.data };
  }
};
const generateErrorMessages = (error) => {
  return error.errors
    ? {
        // AxiosError objects have errors array inside of them, and their message property is called message
        errorMsg: `Error: ${error.errors[0].message}. Try again.`,
      }
    : {
        // Twitter API error results do not have that array, and their message pr is called detail
        errorMsg: `Error: ${error[0].detail} Try again.`,
      };
};
const searchTwitter = async (username) => {
  const { data, errors } = await obtainTwitterProfile(username);
  if (errors) {
    return { ...generateErrorMessages(errors), status: 400 };
  } else {
    return { profile: data, status: 200 };
  }
};
module.exports = { searchTwitter };
