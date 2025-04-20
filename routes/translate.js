const express = require("express");
const router = express.Router();
const db = require("../controllers/db");

// Helper function to get last vowel
const getLastVowel = (word) => {
  const vowels = ["a", "ä", "e", "i", "ı", "o", "ö", "u", "ü"];
  for (let i = word.length - 1; i >= 0; i--) {
    if (vowels.includes(word[i])) return word[i];
  }
  return null;
};

// Simplified suffix rules based on plural and nominative case
const getGagauzNounSuffix = (vowel, plural) => {
  if (!vowel) return "";
  const pluralSuffix = {
    a: "lar",
    ä: "lär",
    e: "lär",
    i: "lär",
    ı: "lar",
    o: "lar",
    u: "lar",
    ö: "lär",
    ü: "lär",
  };
  return plural ? pluralSuffix[vowel] || "lar" : "";
};

router.post("/translate", async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Missing text input" });
  }

  try {
    const input = text.trim().toLowerCase();

    // Step 1: Lookup Russian base word
    const [rusRows] = await db.execute(
      `SELECT word, code_parent, plural, wcase FROM dict_rus WHERE word = ? LIMIT 1`,
      [input]
    );

    if (rusRows.length === 0) {
      return res.json({
        original: text,
        translation: null,
        synonyms: [],
        info: null,
      });
    }

    // Step 2: Resolve base form through code_parent
    let baseWord = rusRows[0].word;
    let currentCode = rusRows[0].code_parent;
    let plural = rusRows[0].plural || 0;
    let wcase = rusRows[0].wcase || 0;

    while (currentCode && currentCode !== 0) {
      const [parentRows] = await db.execute(
        `SELECT word, code_parent FROM dict_rus WHERE code = ? LIMIT 1`,
        [currentCode]
      );
      if (parentRows.length === 0) break;
      baseWord = parentRows[0].word;
      currentCode = parentRows[0].code_parent;
    }

    // Step 3: Try matching baseWord in dict_gagauz
    let [gagRows] = await db.execute(
      `SELECT word, noun, info, synonym FROM dict_gagauz
       WHERE noun LIKE ? OR izafet LIKE ? OR verb LIKE ? OR adverb LIKE ? OR other LIKE ? OR future_or_past_perfect LIKE ?
       ORDER BY LENGTH(word) DESC`,
      Array(6).fill(`%${baseWord}%`)
    );

    if (gagRows.length === 0) {
      [gagRows] = await db.execute(
        `SELECT word, noun, info, synonym FROM dict_gagauz WHERE word = ? LIMIT 1`,
        [baseWord]
      );
    }

    if (gagRows.length === 0) {
      return res.json({
        original: text,
        translation: null,
        synonyms: [],
        info: null,
      });
    }

    // Step 4: Best match by comparing baseWord in noun list
    const matched =
      gagRows.find((row) => {
        const nouns = row.noun ? row.noun.split(",").map((s) => s.trim()) : [];
        return nouns.includes(baseWord);
      }) || gagRows[0];

    // Step 5: Determine root Gagauz word
    const nounForms = matched.noun
      ? matched.noun.split(",").map((s) => s.trim())
      : [];
    let root;

    if (nounForms.includes(input)) {
      root = matched.word; // Use real Gagauz word
    } else if (nounForms.length > 0) {
      root = nounForms[0];
    } else {
      root = matched.word;
    }

    // Step 6: Construct translation using suffix rules
    const lastVowel = getLastVowel(root);
    const suffix = getGagauzNounSuffix(lastVowel, plural);
    const translation = root + suffix;

    // Step 7: Collect synonyms
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

    return res.json({
      original: text,
      translation,
      synonyms,
      info: matched.info || null,
    });
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
