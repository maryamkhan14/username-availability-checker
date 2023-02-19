const { searchTwitter } = require("./searchTwitter");
const { searchTwitch } = require("./searchTwitch");
const { searchReddit } = require("./searchReddit");
const { searchTiktok } = require("./searchTiktok");
const searchAllNetworks = async (username) => {
  const twitterData = searchTwitter(username);
  const twitchData = searchTwitch(username);
  const redditData = searchReddit(username);
  const tikTokData = searchTiktok(username);
  return {
    twitterData: twitterData,
    twitchData: twitchData,
    redditData: redditData,
    tikTokData: tikTokData,
  };
};
module.exports = { searchAllNetworks };
