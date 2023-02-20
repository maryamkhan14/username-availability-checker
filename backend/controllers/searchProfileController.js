const { searchTwitter } = require("../services/searchTwitter");
const { searchTwitch } = require("../services/searchTwitch");
const { searchReddit } = require("../services/searchReddit");
const { searchTiktok } = require("../services/searchTiktok");
const { searchAllNetworks } = require("../services/searchAllNetworks");
const twitterSearch = (username) => {
  return { twitterData: searchTwitter(username) };
};
const redditSearch = (username) => {
  return { redditData: searchReddit(username) };
};
const twitchSearch = (username) => {
  return { twitchData: searchTwitch(username) };
};
const tiktokSearch = (username) => {
  return { tiktokData: searchTiktok(username) };
};
const searchProfilesController = async (req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Transfer-Encoding": "chunked",
  });
  res.write("[");
  await Promise.all([
    twitterSearch(req.params.username),
    redditSearch(req.params.username),
    twitchSearch(req.params.username),
  ]).then((results) =>
    results.map((result) => {
      res.write(JSON.stringify(result) + ",");
    })
  );
  await tiktokSearch(req.params.username).then((result) => {
    res.write(JSON.stringify(result) + "]");
    res.end();
  });
};
module.exports = { searchProfilesController };
