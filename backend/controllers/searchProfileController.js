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
  res.writeHead(200, {
    "Transfer-Encoding": "chunked",
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
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
