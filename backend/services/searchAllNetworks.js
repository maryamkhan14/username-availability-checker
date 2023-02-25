const { searchTwitter } = require("./searchTwitter");
const { searchTwitch } = require("./searchTwitch");
const { searchReddit } = require("./searchReddit");
const { searchTiktok } = require("./searchTiktok");

const twitterSearch = async (username, res) => {
  await searchTwitter(username).then((result) => {
    res.write("data: " + JSON.stringify(result) + "\n\n");
  });
};

const redditSearch = async (username, res) => {
  await searchReddit(username).then((result) => {
    res.write("data: " + JSON.stringify(result) + "\n\n");
  });
};

const twitchSearch = async (username, res) => {
  await searchTwitch(username).then((result) => {
    res.write("data: " + JSON.stringify(result) + "\n\n");
  });
};

const tiktokSearch = async (username, res) => {
  await searchTiktok(username).then((result) => {
    res.write("data: " + JSON.stringify(result) + "\n\n");
  });
};

const searchAllNetworks = async (username, res) => {
  // execute all searches in parallel, then send an "end" signal after all are complete
  await Promise.allSettled([
    twitterSearch(username, res),
    redditSearch(username, res),
    twitchSearch(username, res),
    tiktokSearch(username, res),
  ]).then(() => res.write("data: " + JSON.stringify({ end: "end" }) + "\n\n"));
};
module.exports = { searchAllNetworks };
