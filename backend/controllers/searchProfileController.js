const { searchTwitter } = require("./searchTwitter");
const { searchTwitch } = require("./searchTwitch");
const { searchReddit } = require("./searchReddit");
const { searchTiktok } = require("./searchTiktok");
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
