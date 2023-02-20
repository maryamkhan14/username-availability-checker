const { searchTiktok } = require("../services/searchTiktok");
const { searchAllNetworks } = require("../services/searchAllNetworks");
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
    "Content-Type": "application/json",
    "Transfer-Encoding": "chunked",
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
