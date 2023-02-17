const express = require("express");
const { searchAllNetworks } = require("../controllers/searchProfileController");
const router = express.Router();

// GET endpoint for parameter username
router.get("/:username", searchAllNetworks);

module.exports = router;
