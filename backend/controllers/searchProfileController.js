const { searchTwitter } = require("../services/searchTwitter");
const { searchTwitch } = require("../services/searchTwitch");
const { searchReddit } = require("../services/searchReddit");
const { searchTiktok } = require("../services/searchTiktok");
const { searchAllNetworks } = require("../services/searchAllNetworks");
const searchProfilesController = (req, res) => {
  res.write("[");
  searchTwitter(req.params.username).then((twitterData) =>
    res.write(JSON.stringify({ twitterData: twitterData }))
  );
  searchTwitch(req.params.username).then((twitchData) => {
    res.write(JSON.stringify({ twitchData: twitchData }));
  });
  searchReddit(req.params.username).then((redditData) => {
    res.write(JSON.stringify({ redditData: redditData }));
  });
  searchTiktok(req.params.username).then((tiktokData) => {
    res.write(JSON.stringify({ tiktokData: tiktokData }));
  });
  res.write("]");
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end();
};
module.exports = { searchProfilesController };
