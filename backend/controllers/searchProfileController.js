const { searchTwitter } = require("../services/searchTwitter");
const { searchTwitch } = require("../services/searchTwitch");
const { searchReddit } = require("../services/searchReddit");
const { searchTiktok } = require("../services/searchTiktok");
const { searchAllNetworks } = require("../services/searchAllNetworks");
const twitterSearch = async (username) => {
  return await searchTwitter(username).then((data) => {
    twitterData: data;
  });
};
const redditSearch = async (username) => {
  return await searchReddit(username).then((data) => {
    redditData: data;
  });
};
const twitchSearch = async (username) => {
  return await searchTwitch(username).then((data) => {
    twitchData: data;
  });
};
const tiktokSearch = async (username) => {
  return await searchTiktok(username).then((data) => {
    tiktokData: data;
  });
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
