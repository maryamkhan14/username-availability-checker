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
  //turns request interceptor on
  await page.setRequestInterception(true);

  page.on("request", (request) => {
    if (request.resourceType() !== "document") request.abort();
    else request.continue();
  });

  page.on("response", (response) => {
    userAvailable = true;
    console.log("Response: ", response.status(), response.url());
  });
  //if the page makes a  request to a resource type of image or stylesheet then abort that request

  try {
    await page.goto(searchURL);
  } catch (error) {
    console.error(error);
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
        msg: `Error: The username [${username}] is taken.`,
      };
};

const obtainTiktokProfile = async (username) => {
  let { errors, userAvailable } = await scrapeTiktok(`${BASE_URL}@${username}`);
  console.log("Received results from Tiktok scraper");
  if (errors) {
    // true if error has to do with tiktok scraping
    return { ...generateErrorMessages(true, username), status: 400 };
  } else if (!userAvailable) {
    return { ...generateErrorMessages(false, username), status: 400 };
  } else {
    return {
      msg: `The username ${username} is available!`,
      status: 200,
    };
  }
};
const searchTiktok = async (username) => {
  return await obtainTiktokProfile(username);
};

module.exports = { searchTiktok };
