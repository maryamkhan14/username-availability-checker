require("dotenv").config();

const express = require("express");
const cors = require("cors");
const searchProfileRoutes = require("./routes/searchProfiles");
const { createBrowserAndPage } = require("./services/crawlTiktok");

const app = express();
app.use(cors());
app.options("*", cors());
const puppeteerCache = null;
createBrowserAndPage().then((browserAndPage) => {
  puppeteerCache = browserAndPage;
});
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Max-Age", "86400"); // 24 hours

  req.browser = puppeteerCache.browser;
  req.page = puppeteerCache.page;
  console.log(req.page);

  next();
});

app.use(express.json());

app.use("/search", searchProfileRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
});
