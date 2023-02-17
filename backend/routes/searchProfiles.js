const express = require("express");
const {
  searchProfilesController,
} = require("../controllers/searchProfileController");
const router = express.Router();

// GET endpoint for parameter username
router.get("/:username", searchProfilesController);

module.exports = router;
