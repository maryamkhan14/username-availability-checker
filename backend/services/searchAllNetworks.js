const { searchTwitter } = require("./searchTwitter");
const { searchTwitch } = require("./searchTwitch");
const { searchReddit } = require("./searchReddit");
const { searchTiktok } = require("./searchTiktok");
const twitterSearch = (res, username) => {
  searchTwitter(username).then((result) => {
    res.write("data: " + JSON.stringify(result) + "\n\n");
  });
};
const redditSearch = (res, username) => {
  searchReddit(username).then((result) => {
    res.write("data: " + JSON.stringify(result) + "\n\n");
  });
};
const twitchSearch = (res, username) => {
  searchTwitch(username).then((result) => {
    res.write("data: " + JSON.stringify(result) + "\n\n");
  });
};
const tiktokSearch = (res, username) => {
  searchTiktok(username).then((result) => {
    res.write("data: " + JSON.stringify(result) + "\n\n");
  });
};

const searchAllNetworks = async (res, username) => {
  await Promise.allSettled([
    twitterSearch(res, username),
    redditSearch(res, username),
    twitchSearch(res, username),
    tiktokSearch(res, username),
  ]);

  await res.end();
};
module.exports = { searchAllNetworks };
