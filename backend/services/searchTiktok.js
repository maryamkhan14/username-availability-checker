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
  await page.setDefaultNavigationTimeout(0);
  //turns request interceptor on
  await page.setRequestInterception(true);

  //if the page makes a  request to a resource type of image or stylesheet then abort that request
  page.on("request", (request) => {
    if (
      request.resourceType() === "image" ||
      request.resourceType() === "stylesheet"
    )
      request.abort();
    else request.continue();
  });

  try {
    await page.goto(searchURL);
    let noSuchUser = await page.$x(
      '//div[@class="tiktok-1osbocj-DivErrorContainer emuynwa0"]',
      { timeout: 3000 }
    );
    if (noSuchUser.length > 0) {
      userAvailable = true;
    } else {
      userAvailable = false;
    }
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
