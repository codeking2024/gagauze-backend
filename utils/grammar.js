const DictGagauz = require("../models/dictionary");

exports.translateChunk = async (word) => {
  const result = await DictGagauz.findOne({ where: { word } });

  if (result) {
    return result.word; // Direct match
  } else {
    return `[${word}]`; // Mark untranslated
  }
};
