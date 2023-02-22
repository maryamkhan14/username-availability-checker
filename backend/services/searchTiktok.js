const puppeteer = require("puppeteer");
const path = require("path");
const BASE_URL = "https://www.tiktok.com/";
const scrapeTiktok = async (searchURL) => {
  let userAvailable = false;
  let errors = null;
  const userDataDirPath = path.join(__dirname, "/data");
  const browser = await puppeteer.launch({
    headless: true,
    userDataDir: `${userDataDirPath}`,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  // turns request interceptor on
  await page.setRequestInterception(true);

  page.on("request", (request) => {
    // cancel requests of unnecessary resource types (CSS, images, etc)
    if (request.resourceType() !== "document") request.abort();
    else request.continue();
  });

  page.on("response", (response) => {
    // 200 status code is returned when existing profile is found
    if (response.status() !== 200) userAvailable = true;
  });

  try {
    await page.goto(searchURL);
  } catch (error) {
    errors = { error };
  }

  await page.close();
  await browser.close();

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
        msg: `Error: The Tiktok username [${username}] is taken.`,
      };
};

const obtainTiktokProfile = async (username) => {
  let { errors, userAvailable } = await scrapeTiktok(`${BASE_URL}@${username}`);
  if (errors) {
    // true if error has to do with tiktok scraping
    return {
      ...generateErrorMessages(true, username),
      status: 400,
      type: "TIKTOK_DATA",
    };
  } else if (!userAvailable) {
    return {
      ...generateErrorMessages(false, username),
      status: 400,
      type: "TIKTOK_DATA",
    };
  } else {
    return {
      msg: `The Tiktok username [${username}] is available!`,
      status: 200,
      type: "TIKTOK_DATA",
    };
  }
};
const searchTiktok = async (username) => {
  return await obtainTiktokProfile(username);
};

module.exports = { searchTiktok };
