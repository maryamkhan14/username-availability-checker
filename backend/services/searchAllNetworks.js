const { searchTwitter } = require("./searchTwitter");
const { searchTwitch } = require("./searchTwitch");
const { searchReddit } = require("./searchReddit");
const searchAllNetworks = async (username) => {
  const twitterData = await searchTwitter(username);
  const twitchData = await searchTwitch(username);
  const redditData = await searchReddit(username);
  return {
    twitterData: twitterData,
    twitchData: twitchData,
    redditData: redditData,
  };
};
module.exports = { searchAllNetworks };
