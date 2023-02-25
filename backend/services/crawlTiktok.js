const puppeteer = require("puppeteer");
const path = require("path");

const createBrowserAndPage = async () => {
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

  return { browser, page };
};
module.exports = { createBrowserAndPage };
