const express = require("express");
const {
  crawlTiktokController,
} = require("../controllers/crawlTiktokController");
const router = express.Router();

// GET endpoint for parameter username
router.get("/:username", crawlTiktokController);

module.exports = router;
