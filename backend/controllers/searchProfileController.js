const { searchAllNetworks } = require("../services/searchAllNetworks");
const searchProfilesController = (req, res) => {
  searchAllNetworks(req.params.username).then((results) => {
    res.status(200).json(results);
  });
};
module.exports = { searchProfilesController };
