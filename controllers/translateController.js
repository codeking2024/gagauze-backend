const DictRus = require("../models/DictRus");
const DictGagauz = require("../models/DictGagauz");
const { chunkText } = require("../utils/chunker");
const {
  izafetAddVowel,
  applyGenitiveCase,
  applyPlural,
} = require("../utils/grammar");

const CASE_GENITIVE = 2;

const applyGrammarRules = (rusWord, gagauzWord) => {
  let word = gagauzWord?.word;
  if (!word) return null;

  if (rusWord.plural) {
    word = applyPlural(word);
  }

  if (rusWord.wcase === CASE_GENITIVE) {
    word = applyGenitiveCase(word);
  }

  if (gagauzWord.izafet) {
    word = izafetAddVowel(word);
  }

  return word;
};

exports.translateText = async (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Invalid text input" });
  }

  const words = chunkText(text);
  const translationResult = [];

  for (const word of words) {
    const rusWord = await DictRus.findOne({ where: { word } });

    if (rusWord) {
      const gagauzWord = await DictGagauz.findOne({
        where: { noun: rusWord.word },
      });

      const translated = applyGrammarRules(rusWord, gagauzWord);
      translationResult.push(translated || `[${word}]`);
    } else {
      translationResult.push(`[${word}]`);
    }
  }

  res.json({
    original: text,
    translation: translationResult.join(" "),
  });
};
