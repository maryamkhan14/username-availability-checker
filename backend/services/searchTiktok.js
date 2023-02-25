const axios = require("axios");

const obtainTiktokProfile = async (username) => {
  const uri = `https://tiktok-crawl.onrender.com/crawl/${username}`;
  try {
    const { data } = await axios.get(uri, {
      headers: {
        "User-Agent": `Username Availability Checker`,
      },
    });
    return data;
  } catch (e) {
    // catch Axios API errors
    return { errors: e.response.data.errors };
  }
};

const generateErrorMessages = (error, username) => {
  return error
    ? {
        // Error in scraping Tiktok
        msg: `Tiktok Service Error: ${error}. Try again.`,
      }
    : {
        // Tiktok username already exists
        msg: `Tiktok: Username [${username}] is taken.`,
      };
};

const searchTiktok = async (username) => {
  let { errors, data } = await obtainTiktokProfile(username);

  if (errors) {
    // true if error has to do with tiktok scraping
    return {
      ...generateErrorMessages(error, null),
      status: 400,
      type: "TIKTOK_DATA",
      username: username,
    };
  } else {
    let { status } = data;
    // if the Tiktok scraper got a 200 OK response status when searching for the username (which would indicate user exists)
    if (status == 200)
      return {
        ...generateErrorMessages(null, username),
        status: 400,
        type: "TIKTOK_DATA",
        username: username,
      };
    else if (status == 404)
      return {
        msg: `Tiktok: Username [${username}] is available!`,
        status: 200,
        type: "TIKTOK_DATA",
        username: username,
      };
    // if the Tiktok scraper got some other type of response status (e.g. 502)
    else
      return {
        ...generateErrorMessages(
          `An unknown error occurred. Received response status ${status}.`,
          null
        ),
        status: 400,
        type: "TIKTOK_DATA",
        username: username,
      };
  }
};
module.exports = { searchTiktok };
