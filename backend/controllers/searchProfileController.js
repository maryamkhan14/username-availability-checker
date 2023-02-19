const { searchTwitter } = require("../services/searchTwitter");
const { searchTwitch } = require("../services/searchTwitch");
const { searchReddit } = require("../services/searchReddit");
const { searchTiktok } = require("../services/searchTiktok");
const { searchAllNetworks } = require("../services/searchAllNetworks");
const twitterSearch = (username) => {
  return searchTwitter(username);
};
const redditSearch = (username) => {
  return searchReddit(username);
};
const twitchSearch = (username) => {
  return searchTwitch(username);
};
const tiktokSearch = (username) => {
  return searchTiktok(username);
};
const searchProfilesController = (req, res) => {
  Promise.all([
    twitterSearch(req.params.username),
    redditSearch(req.params.username),
    twitchSearch(req.params.username),
  ])
    .then((data) => data.map((result) => JSON.stringify(result)))
    .then((dataArr) => res.status(200).json(dataArr));
};
module.exports = { searchProfilesController };
