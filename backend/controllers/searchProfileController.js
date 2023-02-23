const { searchTwitter } = require("../services/searchTwitter");
const { searchTiktok } = require("../services/searchTiktok");
const { searchTwitch } = require("../services/searchTwitch");
const { searchReddit } = require("../services/searchReddit");

const twitterSearch = (username, res) => {
  searchTwitter(username)
    .then((result) => {
      res.write("data: " + JSON.stringify(result) + "\n\n");
    })
    .then(() => {
      console.log("resolved");
      resolve();
    });
};
const redditSearch = (username, res) => {
  searchReddit(username)
    .then((result) => {
      res.write("data: " + JSON.stringify(result) + "\n\n");
    })
    .then(() => {
      console.log("resolved");
      resolve();
    });
};
const twitchSearch = (username, res) => {
  searchTwitch(username)
    .then((result) => {
      res.write("data: " + JSON.stringify(result) + "\n\n");
    })
    .then(() => {
      console.log("resolved");
      resolve();
    });
};
const tiktokSearch = (username, res) => {
  return searchTiktok(username)
    .then((result) => {
      res.write("data: " + JSON.stringify(result) + "\n\n");
    })
    .then(() => {
      console.log("resolved");
      resolve();
    });
};
const searchProfilesController = async (req, res) => {
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Expose-Headers":
      "*, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Max-Age",
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  });

  await Promise.allSettled([
    twitterSearch(req.params.username, res),
    redditSearch(req.params.username, res),
    twitchSearch(req.params.username, res),
    tiktokSearch(req.params.username, res),
  ]).then(() => res.end());
};
module.exports = { searchProfilesController };
