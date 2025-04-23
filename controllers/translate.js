const db = require("../config/db");
const {
  getLastVowel,
  transliterateToCyrillic,
  getGagauzNounSuffix,
  getVowelGroup,
} = require("../utils/grammar");
const { rules } = require("../utils/rule");
const axios = require("axios");

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

function convertVerb(
  root,
  {
    verbType = 1, // 1–4; use rusRow.type
    form = "positive", // "positive" or "negative"
    time = "present", // "present", "pasttense", "longpasttense", "future", "futuresimple", "conditional"
    nakl = false, // imperative mood
    face = 1, // 1 = I, 2 = you, 3 = he/she/it
    plural = 0, // 0 = singular, 1 = plural
  }
) {
  const vowel = getLastVowel(root);
  const vowelGroup = getVowelGroup(vowel);
  if (!vowelGroup) return root;

  const mood = nakl ? "imperative" : time;
  const ruleSet = rules?.[form]?.[mood]?.[verbType]?.[vowelGroup];
  if (!ruleSet) return root;

  const personRule = ruleSet[face];
  if (!personRule) return root;

  const suffix = personRule[plural ? "plural" : "singular"];
  if (!suffix) return root;

  return root + (Array.isArray(suffix) ? suffix[0] : suffix);
}

function convertNoun(
  root,
  {
    wcase = 0,
    plural = 0,
    rule = null,
    triggerRule = null,
    triggerTranslate = null,
    time = null,
  }
) {
  if (!root || typeof root !== "string") return root;

  const lastVowel = getLastVowel(root);
  const suffix = getGagauzNounSuffix(lastVowel, plural, wcase);

  let prefix = "";

  // Optional logic for prefixing (like negation or future modifiers)
  if (triggerRule?.toLowerCase().includes("negative") && triggerTranslate) {
    prefix = triggerTranslate + " ";
  }

  return prefix + root + suffix;
}

const tranlateRussianToGagauz = async (req, res) => {
  let { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Missing text input" });
  }

  try {
    text = sanitizeText(text);
    const input = text.toLowerCase();

    const [rusRows] = await db.execute(
      `SELECT id, word, type, code, gender, time, plural, code_parent, wcase, face, nakl FROM dict_rus WHERE word = ?`,
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
      let time = rusRow.time || null;
      let face = rusRow.face || null;
      let nakl = rusRow.nakl || null;
      const verbType = rusRow.type;

      let rule;
      let isTrigger = false;

      if (nakl && time === 0) {
        // only if no tense is set
        rule = "VERB_IMPERATIVE";
        isTrigger = true;
      }

      while (currentCode && currentCode !== 0) {
        const [parentRows] = await db.execute(
          `SELECT word, code_parent FROM dict_rus WHERE code = ? LIMIT 1`,
          [currentCode]
        );
        if (!parentRows.length) break;
        baseWord = parentRows[0].word;
        currentCode = parentRows[0].code_parent;
      }

      let [gagRows] = await db.execute(
        `SELECT id, noun, verb, adverb, izafet, other, word, type, rule, stress, transcription, synonym, info FROM dict_gagauz
         WHERE noun LIKE ? OR izafet LIKE ? OR verb LIKE ? OR adverb LIKE ? OR other LIKE ? OR future_or_past_perfect LIKE ?
         ORDER BY LENGTH(word) DESC`,
        Array(6).fill(`%${baseWord}%`)
      );

      if (!gagRows.length) continue;

      const matched =
        gagRows
          .filter((row) => {
            const nouns =
              row.noun?.split(",").map((s) => s.trim().toLowerCase()) || [];
            return nouns.includes(baseWord.toLowerCase());
          })
          .sort(
            (a, b) =>
              (b.synonym?.split(",").length || 0) -
              (a.synonym?.split(",").length || 0)
          )[0] ||
        gagRows
          .filter((row) => {
            const verbs =
              row.verb?.split(",").map((v) => v.trim().toLowerCase()) || [];
            return verbs.includes(baseWord.toLowerCase());
          })
          .sort(
            (a, b) =>
              (b.synonym?.split(",").length || 0) -
              (a.synonym?.split(",").length || 0)
          )[0] ||
        null;

      if (!matched) continue;

      const root = matched.word;
      let form = "positive";
      if (rule?.toLowerCase().includes("negative")) {
        form = "negative";
      }

      const tenseMap = {
        1: "present",
        2: "pasttense",
        3: "future",
        4: "longpasttense",
      };
      let translation = root;
      if (verbType === 2 && matched.rule) {
        translation = convertVerb(root, {
          verbType,
          form,
          time: tenseMap[time] || "present",
          face,
          plural,
          nakl: !!nakl,
        });
      } else if (verbType === 1) {
        translation = convertNoun(root, {
          wcase,
          plural,
          rule: matched.rule,
          triggerRule: rule,
          triggerTranslate: matched.translate,
          time,
        });
      }

      let synonyms = [];
      if (matched.synonym) {
        synonyms = matched.synonym
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }

      synonyms = [...new Set(synonyms)].filter((s) => s !== root);
      const pronunciation = transliterateToCyrillic(translation);

      results.push({
        translation,
        synonyms,
        pronunciation,
        info: matched.info || null,
        base: baseWord,
        plural,
        wcase,
        face,
        time,
        nakl,
        rule: matched.rule || null,
      });
    }

    if (!results.length) {
      return res.json({
        original: text,
        results: [],
        code: "",
      });
    }
    results.sort((a, b) => (a.wcase ?? 0) - (b.wcase ?? 0));
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

async function getPosTagsFromUdpipe(text) {
  const formData = new URLSearchParams();
  formData.append("data", text);
  formData.append("model", "russian-syntagrus-ud-2.5-191206");
  formData.append("tokenizer", "");
  formData.append("tagger", "");
  formData.append("parser", "");

  try {
    const response = await axios.post(
      "https://lindat.mff.cuni.cz/services/udpipe/api/process",
      formData,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    const conllu = response.data.result;
    const lines = conllu
      .split("\n")
      .filter((line) => line && !line.startsWith("#"));
    const tokens = lines.map((line) => {
      const parts = line.split("\t");
      return {
        index: parseInt(parts[0], 10),
        text: parts[1],
        lemma: parts[2],
        upos: parts[3], // NOUN, VERB, ADP, etc.
        head: parseInt(parts[6], 10),
        dep: parts[7],
      };
    });

    return tokens;
  } catch (err) {
    console.error("UDPipe POS tagging failed:", err.message);
    return [];
  }
}

module.exports = {
  tranlateRussianToGagauz,
};
