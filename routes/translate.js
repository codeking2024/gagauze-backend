const express = require("express");
const router = express.Router();
const { tranlateRussianToGagauz } = require("../controllers/translate");
const { resolveShortLink } = require("../controllers/linkController");
const { addSuggestion } = require("../controllers/suggestionController");

router.post("/translate", tranlateRussianToGagauz);
router.get("/link/:code", resolveShortLink);
router.post("/suggest", addSuggestion);

module.exports = router;
