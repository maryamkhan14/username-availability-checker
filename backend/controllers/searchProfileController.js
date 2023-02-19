const { searchAllNetworks } = require("../services/searchAllNetworks");
const searchProfilesController = async (req, res) => {
  let results = await searchAllNetworks(req.params.username);
  res.status(200).json(results);
};
module.exports = { searchProfilesController };
