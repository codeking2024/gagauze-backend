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

// Helper function to transliterate Latin Gagauz to Cyrillic-style pronunciation
const transliterateToCyrillic = (text) => {
  const map = {
    Ä: "Ӓ",
    ä: "ӓ",
    B: "Б",
    b: "б",
    V: "В",
    v: "в",
    G: "Г",
    g: "г",
    D: "Д",
    d: "д",
    E: "Е",
    e: "е",
    J: "Ж",
    j: "ж",
    C: "Дж",
    c: "дж",
    Z: "З",
    z: "з",
    İ: "И",
    i: "и",
    Y: "Й",
    y: "й",
    K: "К",
    k: "к",
    L: "Л",
    l: "л",
    M: "М",
    m: "м",
    N: "Н",
    n: "н",
    O: "О",
    o: "о",
    Ö: "Ӧ",
    ö: "ӧ",
    P: "П",
    p: "п",
    R: "Р",
    r: "р",
    S: "С",
    s: "с",
    T: "Т",
    t: "т",
    U: "У",
    u: "у",
    Ü: "Ӱ",
    ü: "ӱ",
    F: "Ф",
    f: "ф",
    H: "Х",
    h: "х",
    Ţ: "Ц",
    ţ: "ц",
    Ç: "Ч",
    ç: "ч",
    Ş: "Ш",
    ş: "ш",
    I: "Ы",
    ı: "ы",
    Ê: "Э",
    ê: "э",
  };
  return text
    .split("")
    .map((ch) => map[ch] || ch)
    .join("");
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

    // word : base form, code_parent: root word, plural: is the word plural
    const [rusRows] = await db.execute(
      `SELECT word, code_parent, plural, wcase FROM dict_rus WHERE word = ? LIMIT 1`,
      [input]
    );

    if (rusRows.length === 0) {
      return res.json({
        original: text,
        translation: null,
        synonyms: [],
        pronunciation: null,
        info: null,
      });
    }

    let baseWord = rusRows[0].word;
    let currentCode = rusRows[0].code_parent;
    let plural = rusRows[0].plural || 0;
    let wcase = rusRows[0].wcase || 0;

    // If the Russian word has a code_parent, follow it recursively until the base/root form is found.
    while (currentCode && currentCode !== 0) {
      const [parentRows] = await db.execute(
        `SELECT word, code_parent FROM dict_rus WHERE code = ? LIMIT 1`,
        [currentCode]
      );
      if (parentRows.length === 0) break;
      baseWord = parentRows[0].word;
      currentCode = parentRows[0].code_parent;
    }

    // Find matches in dict_gagauz using multiple fields:noun, verb, izafet, etc.
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

    if (gagRows.length === 0) {
      return res.json({
        original: text,
        translation: null,
        synonyms: [],
        pronunciation: null,
        info: null,
      });
    }

    // Prefers rows where the Russian base word appears explicitly in noun.
    const matched =
      gagRows.find((row) => {
        const nouns = row.noun ? row.noun.split(",").map((s) => s.trim()) : [];
        return nouns.includes(baseWord);
      }) || gagRows[0];

    const nounForms = matched.noun
      ? matched.noun.split(",").map((s) => s.trim())
      : [];
    let root;
    // Determine Gagauz Root
    if (nounForms.includes(input)) {
      root = matched.word;
    } else if (nounForms.length > 0) {
      root = nounForms[0];
    } else {
      root = matched.word;
    }

    // Apply Suffix Logic
    const lastVowel = getLastVowel(root);
    const suffix = getGagauzNounSuffix(lastVowel, plural);
    const translation = root + suffix;

    // Find Synonyms
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

    // Generate Pronunciation
    const pronunciation =
      matched.transcription || transliterateToCyrillic(translation);

    return res.json({
      original: text,
      translation,
      synonyms,
      pronunciation,
      info: matched.info || null,
    });
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
