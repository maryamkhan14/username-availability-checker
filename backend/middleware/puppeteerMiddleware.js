const { createBrowserAndPage } = require("./services/crawlTiktok");
let puppeteerCache;
const puppeteerMiddleware = (req, res, next) => {
  if (puppeteerCache) {
    let { browser, page } = puppeteerCache;
    req.browser = browser;
    req.page = page;
    return next();
  } else {
    createBrowserAndPage().then((browserAndPage) => {
      puppeteerCache = browserAndPage;
      req.browser = puppeteerCache.browser;
      req.page = puppeteerCache.page;
    });
  }
};
module.exports = puppeteerMiddleware;
