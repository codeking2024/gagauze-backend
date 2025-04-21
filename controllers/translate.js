const db = require("../config/db");
const {
  getLastVowel,
  transliterateToCyrillic,
  getGagauzNounSuffix,
} = require("../utils/grammar");

function sanitizeText(text) {
  const words = text.trim().split(/\s+/).slice(0, 4);
  return words.join(" ").slice(0, 100);
}

function generateShortCode(length = 5) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  return Array.from({ length }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
}

async function getOrCreateShortLink(text, direction = "ru") {
  const [existing] = await db.execute(
    `SELECT code FROM tlink WHERE text = ? LIMIT 1`,
    [text]
  );

  if (existing.length > 0) {
    return existing[0].code;
  }

  let code;
  let found = true;
  while (found) {
    code = generateShortCode();
    const [check] = await db.execute(
      `SELECT id FROM tlink WHERE code = ? LIMIT 1`,
      [code]
    );
    found = check.length > 0;
  }

  await db.execute(
    `INSERT INTO tlink (code, direction, text) VALUES (?, ?, ?)`,
    [code, direction, text]
  );

  return code;
}

const tranlateRussianToGagauz = async (req, res) => {
  let { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Missing text input" });
  }

  try {
    text = sanitizeText(text);
    const input = text.toLowerCase();

    // Step 1: Lookup all rows in dict_rus
    const [rusRows] = await db.execute(
      `SELECT word, code, code_parent, plural, wcase FROM dict_rus WHERE word = ?`,
      [input]
    );

    if (rusRows.length === 0) {
      const code = await getOrCreateShortLink(text, "ru");
      return res.json({
        original: text,
        results: [],
        code,
      });
    }

    const results = [];

    for (const rusRow of rusRows) {
      let baseWord = rusRow.word;
      let currentCode = rusRow.code_parent;
      let plural = rusRow.plural || 0;
      let wcase = rusRow.wcase || 0;

      while (currentCode && currentCode !== 0) {
        const [parentRows] = await db.execute(
          `SELECT word, code_parent FROM dict_rus WHERE code = ? LIMIT 1`,
          [currentCode]
        );
        if (parentRows.length === 0) break;
        baseWord = parentRows[0].word;
        currentCode = parentRows[0].code_parent;
      }

      let [gagRows] = await db.execute(
        `SELECT word, noun, info, synonym, transcription FROM dict_gagauz
         WHERE noun LIKE ? OR izafet LIKE ? OR verb LIKE ? OR adverb LIKE ? OR other LIKE ? OR future_or_past_perfect LIKE ?
         ORDER BY LENGTH(word) DESC`,
        Array(6).fill(`%${baseWord}%`)
      );

      if (gagRows.length === 0) {
        [gagRows] = await db.execute(
          `SELECT word, noun, info, synonym, transcription FROM dict_gagauz WHERE word = ? LIMIT 1`,
          [baseWord]
        );
      }

      if (gagRows.length === 0) continue;

      const matched =
        gagRows.find((row) => {
          const nouns = row.noun
            ? row.noun.split(",").map((s) => s.trim())
            : [];
          return nouns.includes(baseWord);
        }) || gagRows[0];

      const root = matched.word;
      const lastVowel = getLastVowel(root);
      const suffix = getGagauzNounSuffix(lastVowel, plural, wcase);
      const translation = root + suffix;

      let synonyms = [];
      if (matched.synonym) {
        synonyms = matched.synonym
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }

      const [backrefRows] = await db.execute(
        `SELECT word, synonym FROM dict_gagauz WHERE synonym LIKE ?`,
        [`%${matched.word}%`]
      );

      for (const row of backrefRows) {
        if (!synonyms.includes(row.word)) {
          synonyms.push(row.word);
        }
        const extraSyns = row.synonym
          ? row.synonym
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [];
        for (const syn of extraSyns) {
          if (!synonyms.includes(syn)) {
            synonyms.push(syn);
          }
        }
      }

      synonyms = [...new Set(synonyms)].filter((s) => s !== root);
      const pronunciation =
        matched.transcription || transliterateToCyrillic(translation);

      results.push({
        translation,
        synonyms,
        pronunciation,
        info: matched.info || null,
        base: baseWord,
        plural,
        wcase,
      });
    }

    const code = await getOrCreateShortLink(text, "ru");

    return res.json({
      original: text,
      results,
      code,
    });
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  tranlateRussianToGagauz,
};
