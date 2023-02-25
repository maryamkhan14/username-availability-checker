const { scrapeTiktok } = require("../services/scrapeTiktok");

const crawlTiktokController = async (req, res) => {
  await scrapeTiktok(req.params.username, res);
};
module.exports = { crawlTiktokController };
