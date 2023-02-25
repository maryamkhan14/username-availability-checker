const puppeteer = require("puppeteer");
const path = require("path");
const BASE_URL = "https://www.tiktok.com/";

const createBrowser = async () => {
  const userDataDirPath = path.join(__dirname, "/data");
  const browser = await puppeteer.launch({
    headless: true,
    userDataDir: `${userDataDirPath}`,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  return browser;
};

const scrapeTiktok = async (username, res) => {
  const browser = await createBrowser();
  const page = await browser.newPage();
  // turns request interceptor on
  await page.setRequestInterception(true);

  page.on("request", (request) => {
    // cancel requests of unnecessary resource types (CSS, images, etc)
    if (request.resourceType() !== "document") request.abort();
    else request.continue();
  });

  page.on("response", (response) => {
    res.status(200).json({ responseStatus: response.status(), errors: null });
  });

  try {
    await page.goto(`${BASE_URL}@${username}`);
  } catch (error) {
    res.status(200).json({ responseStatus: response.status(), errors: error });
  }
};
module.exports = { scrapeTiktok };