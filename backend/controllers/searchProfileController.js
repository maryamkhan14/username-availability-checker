const { searchTwitter } = require("../services/searchTwitter");
const { searchTwitch } = require("../services/searchTwitch");
const { searchReddit } = require("../services/searchReddit");
const { searchTiktok } = require("../services/searchTiktok");
const { searchAllNetworks } = require("../services/searchAllNetworks");
const twitterSearch = (username) => {
  return searchTwitter(username).then((twitterData) =>
    JSON.stringify({ twitterData: twitterData })
  );
};
const redditSearch = (username) => {
  return searchReddit(username).then((redditData) => {
    return JSON.stringify({ redditData: redditData });
  });
};
const twitchSearch = (username) => {
  return searchTwitch(username).then((twitchData) => {
    return JSON.stringify({ twitchData: twitchData });
  });
};
const tiktokSearch = (username) => {
  return searchTiktok(username).then((tiktokData) => {
    JSON.stringify({ tiktokData: tiktokData });
  });
};
const searchProfilesController = (req, res) => {
  Promise.all([
    twitterSearch(req.params.username),
    redditSearch(req.params.username),
    twitchSearch(req.params.username),
    tiktokSearch(req.params.username),
  ]).then((data) => res.status(200).json(data));
};
module.exports = { searchProfilesController };
