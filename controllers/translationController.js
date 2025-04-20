const DictGagauz = require("../models/dictionary");
const { translateChunk } = require("../utils/grammar");

exports.translateText = async (req, res) => {
  const { text } = req.body;

  // Split text into chunks (simple example)
  const words = text.toLowerCase().split(/\s+/);

  const translatedWords = await Promise.all(
    words.map((word) => translateChunk(word))
  );

  res.json({
    original: text,
    translation: translatedWords.join(" "),
    details: translatedWords,
  });
};
