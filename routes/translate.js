const express = require("express");
const { translateText } = require("../controllers/translationController");

const router = express.Router();

router.post("/translate", translateText);

module.exports = router;
