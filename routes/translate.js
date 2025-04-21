const express = require("express");
const router = express.Router();
const { tranlateRussianToGagauz } = require("../controllers/translate");

router.post("/translate", tranlateRussianToGagauz);

module.exports = router;
