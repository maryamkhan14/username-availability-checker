const { searchTwitter } = require("../services/searchTwitter");
const { searchTwitch } = require("../services/searchTwitch");
const { searchReddit } = require("../services/searchReddit");
const { searchTiktok } = require("../services/searchTiktok");
const { searchAllNetworks } = require("../services/searchAllNetworks");
const searchProfilesController = (req, res) => {
  res.setHeader(200, { "Content-Type": "application/json" });

  searchTwitter(req.params.username).then((twitterData) =>
    res.write({ twitterData: twitterData })
  );
  searchTwitch(req.params.username).then((twitchData) => {
    res.write({ twitchData: twitchData });
  });
  searchReddit(req.params.username).then((redditData) => {
    res.write({ redditData: redditData });
  });
  searchTiktok(req.params.username).then((tiktokData) => {
    res.write({ tiktokData: tiktokData });
  });
  res.end();
};
module.exports = { searchProfilesController };
