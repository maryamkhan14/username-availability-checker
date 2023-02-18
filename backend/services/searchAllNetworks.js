const { searchTwitter } = require("./searchTwitter");
const { searchTwitch } = require("./searchTwitch");
const { searchReddit } = require("./searchReddit");
const { searchTiktok } = require("./searchTiktok");
const searchAllNetworks = async (username) => {
  const twitterData = await searchTwitter(username);
  const twitchData = await searchTwitch(username);
  const redditData = await searchReddit(username);
  const tikTokData = await searchTiktok(username);
  return {
    twitterData: twitterData,
    twitchData: twitchData,
    redditData: redditData,
    tikTokData: tikTokData,
  };
};
module.exports = { searchAllNetworks };
