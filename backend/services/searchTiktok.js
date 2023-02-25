const puppeteer = require("puppeteer");
const path = require("path");
const BASE_URL = "https://www.tiktok.com/";

const scrapeTiktok = async (searchURL, page) => {
  let userAvailable = false;
  let errors = null;

  page.on("response", (response) => {
    // 200 status code is returned when existing profile is found
    if (response.status() !== 200) userAvailable = true;
  });

  try {
    await page.goto(searchURL);
  } catch (error) {
    errors = { error };
  }

  return { errors, userAvailable };
};

const generateErrorMessages = (scrapeError, username) => {
  return scrapeError
    ? {
        // Error in scraping Tiktok
        msg: `Unknown error occurred when scraping Tiktok for the username [${username}]. Please try again at another time.`,
      }
    : {
        // Twitch username already exists
        msg: `The Tiktok username [${username}] is taken.`,
      };
};

const obtainTiktokProfile = async (username, page) => {
  let { errors, userAvailable } = await scrapeTiktok(
    `${BASE_URL}@${username}`,
    page
  );
  if (errors) {
    // true if error has to do with tiktok scraping
    return {
      ...generateErrorMessages(true, username),
      status: 400,
      type: "TIKTOK_DATA",
      username: username,
    };
  } else if (!userAvailable) {
    return {
      ...generateErrorMessages(false, username),
      status: 400,
      type: "TIKTOK_DATA",
      username: username,
    };
  } else {
    return {
      msg: `The Tiktok username [${username}] is available!`,
      status: 200,
      type: "TIKTOK_DATA",
      username: username,
    };
  }
};
const searchTiktok = async (username, page) => {
  return await obtainTiktokProfile(username, page);
};

module.exports = { searchTiktok };
