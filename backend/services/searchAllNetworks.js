const { searchTwitter } = require("./searchTwitter");
const { searchTwitch } = require("./searchTwitch");
const { searchReddit } = require("./searchReddit");
const { searchTiktok } = require("./searchTiktok");
const twitterSearch = (username) => {
  searchTwitter(username).then((result) => {
    res.write("data: " + JSON.stringify(result) + "\n\n");
  });
};
const redditSearch = (username) => {
  searchReddit(username).then((result) => {
    res.write("data: " + JSON.stringify(result) + "\n\n");
  });
};
const twitchSearch = (username) => {
  searchTwitch(username).then((result) => {
    res.write("data: " + JSON.stringify(result) + "\n\n");
  });
};
const tiktokSearch = (username) => {
  searchTiktok(username).then((result) => {
    res.write("data: " + JSON.stringify(result) + "\n\n");
  });
};

const searchAllNetworks = async (res, username) => {
  await Promise.allSettled(
    twitterSearch(username),
    redditSearch(username),
    twitchSearch(username),
    tiktokSearch(username)
  );

  await res.end();
};
module.exports = { searchAllNetworks };
