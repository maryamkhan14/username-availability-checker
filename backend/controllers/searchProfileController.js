const { searchTwitter } = require("../services/searchTwitter");
const { searchTiktok } = require("../services/searchTiktok");
const { searchTwitch } = require("../services/searchTwitch");
const { searchReddit } = require("../services/searchReddit");

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
const searchProfilesController = async (req, res) => {
  res.writeHead(200, "Access-Control-Allow-Origin: *", {
    "Access-Control-Expose-Headers":
      "*, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Max-Age",
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  });
  await Promise.all([
    twitterSearch(req.params.username),
    redditSearch(req.params.username),
    twitchSearch(req.params.username),
  ]).then((results) =>
    results.map((result) => {
      res.write("data: " + JSON.stringify(result) + "\n\n");
    })
  );
  await tiktokSearch(req.params.username).then((result) => {
    res.write("data: " + JSON.stringify(result) + "\n\n");
  });
};
module.exports = { searchProfilesController };
