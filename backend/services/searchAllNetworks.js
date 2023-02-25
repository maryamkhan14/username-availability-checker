const { searchTwitter } = require("./searchTwitter");
const { searchTwitch } = require("./searchTwitch");
const { searchReddit } = require("./searchReddit");
const { searchTiktok } = require("./searchTiktok");

const twitterSearch = (username, res) => {
  searchTwitter(username).then((result) => {
    res.write("data: " + JSON.stringify(result) + "\n\n");
  });
};

const redditSearch = (username, res) => {
  searchReddit(username).then((result) => {
    res.write("data: " + JSON.stringify(result) + "\n\n");
  });
};

const twitchSearch = (username, res) => {
  searchTwitch(username).then((result) => {
    res.write("data: " + JSON.stringify(result) + "\n\n");
  });
};

const tiktokSearch = (username, page, res) => {
  searchTiktok(username, page).then((result) => {
    res.write("data: " + JSON.stringify(result) + "\n\n");
  });
};

const searchAllNetworks = async (req, res) => {
  // execute all searches in parallel, then send an "end" signal after all are complete
  await Promise.allSettled([
    twitterSearch(req.params.username, res),
    redditSearch(req.params.username, res),
    twitchSearch(req.params.username, res),
    tiktokSearch(req.params.username, req.page, res),
  ]).then(() => res.write("data: " + JSON.stringify({ end: "end" }) + "\n\n"));
};
module.exports = { searchAllNetworks };
