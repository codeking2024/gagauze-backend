const express = require("express");
const router = express.Router();
const { tranlateRussianToGagauz } = require("../controllers/translate");
const { resolveShortLink } = require("../controllers/linkController");

router.post("/translate", tranlateRussianToGagauz);
router.get("/link/:code", resolveShortLink);

module.exports = router;
