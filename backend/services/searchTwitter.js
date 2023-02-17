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
    // return object contained inside data property
    return { ...data };
  } catch (e) {
    return { errors: e.response.data.errors };
  }
};
const generateErrorMessages = (error) => {
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
  const { data, errors } = await obtainTwitterProfile(username);
  if (errors && errors[0].title && errors[0].title === "Not Found Error") {
    return {
      msg: `The Twitter username [${username}] exists!`,
      status: 200,
    };
  } else if (errors) {
    return { ...generateErrorMessages(errors[0]), status: 400 };
  } else if (data) {
    return {
      ...generateErrorMessages({
        detail: `The Twitter username [${username}] is taken. `,
      }),
      status: 400,
    };
  }
};
module.exports = { searchTwitter };
