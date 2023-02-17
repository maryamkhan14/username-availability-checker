const { searchTwitter } = require("../services/searchTwitter");

const searchAllNetworks = async (req, res) => {
  const twitterData = await searchTwitter(req.params.username);
  console.log(twitterData);
};
module.exports = { searchAllNetworks };
