const { searchAllNetworks } = require("../services/searchAllNetworks");
const searchProfilesController = async (req, res) => {
  const results = await searchAllNetworks(req.params.username);
  console.log(results);
  res.status(200).json(results);
};
module.exports = { searchProfilesController };
