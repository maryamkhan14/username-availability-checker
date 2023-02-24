const { searchAllNetworks } = require("../services/searchAllNetworks");

const searchProfilesController = async (req, res) => {
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Expose-Headers":
      "*, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Max-Age",
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  });
  await searchAllNetworks(res, req.params.username);
};
module.exports = { searchProfilesController };
