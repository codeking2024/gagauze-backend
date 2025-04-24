const db = require("../config/db");
const {
  getLastVowel,
  transliterateToCyrillic,
  getVowelGroup,
} = require("../utils/grammar");
const {
  rules,
  rulesForNoun,
  consonant,
  consonantSonorous,
  consonantDeaf,
  vowel,
  vowel_rus,
  consonant_rus,
} = require("../utils/rule");
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

function getVerbStem(root) {
  let base = root;

  // Remove final "maa" or "mää"
  if (base.endsWith("maa") || base.endsWith("mää")) {
    base = base.slice(0, -3);
  }

  // // Convert "t" to "d" if preceded by a vowel (e.g., "git" → "gid")
  // const vowels = ["a", "ä", "e", "i", "ı", "o", "ö", "u", "ü", "ȇ"];
  // const len = base.length;
  // if (len >= 2) {
  //   const lastChar = base[len - 1];
  //   const prevChar = base[len - 2];
  //   if (lastChar === "t" && vowels.includes(prevChar)) {
  //     base = base.slice(0, -1) + "d";
  //   }
  // }

  return base;
}

function isLastVowelRus(word) {
  const lastChar = Array.from(word).slice(-1)[0];
  return vowel_rus.includes(lastChar);
}

function getEndingVerb(rule, scenario, letter, plural, face, trigger = null) {
  const r = rule.toLowerCase().split("_"); // e.g., ['verb', 'positive', 'present']
  const voice = r[1]; // positive / negative
  const tense = r[2]; // present / pasttense / imperative etc.
  const number = plural ? "plural" : "singular";
  face = face || 1;

  if (!rules[voice] || !rules[voice][tense] || !rules[voice][tense][scenario]) {
    return false;
  }

  // 1. Match vowel group for this scenario
  const vowelGroupMap = rules[voice][tense][scenario];
  let selected = null;

  for (const group of Object.keys(vowelGroupMap)) {
    const groupLetters = group.split(",");
    if (groupLetters.includes(letter)) {
      selected = vowelGroupMap[group];
      break;
    }
  }

  if (!selected) return false;

  switch (rule) {
    case "VERB_POSITIVE_PRESENT":
      return selected[face]?.[number] ?? false;
    case "VERB_POSITIVE_PASTTENSE":
      return selected[3]?.[number][0] ?? false;
  }

  // // 2. Direct case-based logic
  // switch (rule) {
  //   case "VERB_POSITIVE_PRESENT":
  //     return selected[face]?.[number] ?? false;

  //   case "VERB_POSITIVE_FUTURE":
  //     // Plural/sg might change based on face
  //     const futureNum = [4, 5, 6].includes(face) ? "plural" : "singular";
  //     for (const item of Object.values(selected)) {
  //       if (item[futureNum] && Array.isArray(item[futureNum])) {
  //         if (item[futureNum][1] === trigger) {
  //           return item[futureNum][0];
  //         } else if (
  //           Array.isArray(item[futureNum][1]) &&
  //           item[futureNum][1].includes(trigger)
  //         ) {
  //           return item[futureNum][0];
  //         }
  //       }
  //     }
  //     break;
  // }

  // 3. Fallback loop-based search for triggers
  // for (const item of Object.values(selected)) {
  //   if (item[number] && Array.isArray(item[number])) {
  //     const [ending, trig] = item[number];
  //     if (trig === trigger) return ending;
  //     if (Array.isArray(trig) && trig.includes(trigger)) return ending;
  //   }
  // }

  return false;
}

function getPluralEnding(word) {
  const vow1 = ["a", "u", "ı", "o", "ê"];
  const vow2 = ["ä", "ü", "i", "ö", "e"];

  const lastLetter = getLastLetter(word);
  const lastVowel = getLastVowel(word);

  if (lastLetter === "n" || lastLetter === "m") {
    if (vow1.includes(lastVowel)) return "nar";
    if (vow2.includes(lastVowel)) return "när";
  } else {
    if (vow1.includes(lastVowel)) return "lar";
    if (vow2.includes(lastVowel)) return "lär";
  }

  return ""; // Fallback if no vowel match
}

function getEndingNoun(rule, letter, wcase) {
  if (!rulesForNoun[rule]) return false;

  for (const key of Object.keys(rulesForNoun[rule])) {
    const letters = key.split(",");
    if (letters.includes(letter)) {
      const form = rulesForNoun[rule][key];
      if (form && typeof form[wcase] !== "undefined") {
        return form[wcase];
      }
    }
  }

  return false;
}

function cutEndChars(word, count) {
  const chars = Array.from(word); // Handles multibyte correctly
  console.log(chars);
  return chars.slice(0, -count).join("");
}

function convertNoun(
  root,
  {
    wcase = 0,
    plural = 0,
    rule,
    triggerRule = null,
    triggerTranslate = null,
    time = 0,
  }
) {
  let suffix = "";

  if (plural == 1) {
    suffix = getPluralEnding(root);
    return root + suffix;
  }

  const lastVowel = getLastVowel(root);
  const varcase = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
  };

  const _case = varcase[wcase]; // Use `wcase` variable from your logic

  switch (rule) {
    case "5":
      root = cutEndChars(root, 2);
      break;
    case "6":
    case "7":
    case "8":
      root = cutEndChars(root, 1);
      break;
    default:
      // no change
      break;
  }

  suffix = getEndingNoun(rule, lastVowel, _case);

  return root + suffix;
}

const face = {
  1: "я",
  2: "ты",
  3: "он",
  4: "мы",
  5: "вы",
  6: "они",
};

function getLastLetter(word) {
  if (!word) return "";
  const chars = Array.from(word); // handles emojis, diacritics, etc.
  return chars[chars.length - 1] || "";
}

function getScenarioVerb(word) {
  const exceptions = ["git", "et", "tat", "güt", "siyret"];

  if (exceptions.includes(word)) {
    return 4;
  }

  for (let i = 1; i <= 3; i++) {
    if (getRuleGagDict(word, i)) {
      return i;
    }
  }

  return null; // fallback if no match (optional)
}

// Multibyte-safe slice helpers
const getLastChar = (word) => Array.from(word).slice(-1)[0] || "";
const getCharBeforeLast = (word) => Array.from(word).slice(-2, -1)[0] || "";

// The rule function
function getRuleGagDict(word, i) {
  const last = getLastChar(word);
  const beforeLast = getCharBeforeLast(word);

  switch (i) {
    case 1:
      if (vowel.includes(last)) return i;
      break;
    case 2:
      if (consonantSonorous.includes(last)) return i;
      break;
    case 3:
      if (consonantDeaf.includes(last)) return i;
      break;
    case 4:
      if (last === "n") return i;
      break;
    case 5:
      if (last === "k" && vowel.includes(beforeLast)) return i;
      break;
    case 6:
      if (last === "t") return i;
      break;
    case 7:
      if (last === "p") return i;
      break;
    case 8:
      if (last === "ç") return i;
      break;
    case 9:
      if (last === "k" && consonant.includes(beforeLast)) return i;
      break;
    default:
      break;
  }

  return false;
}

const tranlateRussianToGagauz = async (req, res) => {
  let { text } = req.body;
  if (!text) return res.status(400).json({ error: "Missing text input" });

  try {
    text = sanitizeText(text);
    const input = text.toLowerCase();

    // Check collocation table
    const [rows] = await db.execute(
      `SELECT id, text, translate FROM collocation WHERE text = ? LIMIT 1`,
      [input]
    );

    if (rows.length) {
      let original = input;
      let translate = rows[0].translate;
      let pronunciation = transliterateToCyrillic(translate);
      const code = await getOrCreateShortLink(text, "ru");

      return res.json({
        original: original,
        results: [
          {
            translation: translate,
            pronunciation,
            wcase: null,
          },
        ],
        code,
      });
    } else {
      const [rows] = await db.execute(
        `SELECT id, name, rule, translate, face FROM triggers WHERE name = ? LIMIT 1`,
        [input]
      );

      if (rows.length) {
        let original = input;
        let translate = rows[0].translate;
        let pronunciation = "";
        if (translate) {
          pronunciation = transliterateToCyrillic(translate);
        } else {
          translate = original;
        }

        const code = await getOrCreateShortLink(text, "ru");
        return res.json({
          original: original,
          results: [
            {
              translation: translate,
              pronunciation,
              wcase: null,
            },
          ],
          code,
        });
      } else {
        const [rusRows] = await db.execute(
          `SELECT id, word, type, code, gender, time, plural, code_parent, wcase, face, nakl FROM dict_rus WHERE word = ?`,
          [input]
        );

        if (rusRows.length === 0) {
          return res.json({ original: text, results: [], code: "" });
        }

        const results = [];
        for (const rusRow of rusRows) {
          let {
            word: baseWord,
            code_parent: currentCode,
            plural,
            wcase,
            time,
            face,
            nakl,
            type: wordType,
          } = rusRow;

          let current_rule;
          let form = "POSITIVE";
          if (nakl) {
            current_rule = "VERB_" + form + "IMPERATIVE";
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

          const matched = selectBestMatch(gagRows, baseWord);

          if (!matched) continue;

          const rule = matched.rule;
          const root = matched.word;

          let translation;

          if (wordType == 1 && rule && rule < 10) {
            translation = convertNoun(root, {
              wcase,
              plural,
              rule: matched.rule,
              triggerRule: rule,
              triggerTranslate: matched.translate,
              time,
            });

            const synonyms = [
              ...new Set(
                (matched.synonym || "")
                  .split(",")
                  .map((s) => s.trim())
                  .filter((s) => s && s !== root)
              ),
            ];
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

          if (wordType == 6) {
            translation = matched.word;
            const synonyms = [
              ...new Set(
                (matched.synonym || "")
                  .split(",")
                  .map((s) => s.trim())
                  .filter((s) => s && s !== root)
              ),
            ];
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
            });
          }

          if (wordType == 2 || wordType == 5) {
            if (time == 0 && plural !== 1) {
              translation = matched.word;
              const synonyms = [
                ...new Set(
                  (matched.synonym || "")
                    .split(",")
                    .map((s) => s.trim())
                    .filter((s) => s && s !== root)
                ),
              ];
              const pronunciation = transliterateToCyrillic(translation);
              results.push({
                translation,
                synonyms,
                pronunciation,
                info: matched.info,
                base: baseWord,
                plural,
                wcase,
                face,
                time,
                nakl,
                rule: matched.rule || null,
              });
            }

            if (time != 0) {
              if (time == 1 && wcase == 0) {
                current_rule = "VERB_" + form + "_PASTTENSE";
              }
              if (time == 3 && wcase == 0) {
                current_rule = "VERB_POSITIVE_FUTURESIMPLE";
              }
              if (time == 2 && wcase == 0) {
                current_rule = "VERB_POSITIVE_PRESENT";
              }
              let stem = getVerbStem(root);
              let scenario = getScenarioVerb(stem);
              if (scenario == 4) {
                if (root.endsWith("maa") || root.endsWith("mää")) {
                  stem = root.slice(0, -4);
                }
              }
              const lastVowel = getLastVowel(stem);

              let suffix = getEndingVerb(
                current_rule,
                scenario,
                lastVowel,
                plural,
                face
              );

              translation = stem + suffix;
              const pronunciation = transliterateToCyrillic(translation);

              results.push({
                translation,
                synonyms: [],
                pronunciation,
                info: null,
                base: root,
                plural,
                wcase,
              });
            }
          }

          // const form = rule?.toLowerCase().includes("negative")
          //   ? "negative"
          //   : "positive";
          // const tenseMap = {
          //   2: "present", // ✅ map PHP `time=2` to PRESENT for verbs like "Иду"
          //   3: "pasttense",
          //   4: "future",
          //   5: "longpasttense",
          // };

          // let translation = root;
          // if (verbType === 2) {
          //   translation = convertVerb(root, {
          //     verbType,
          //     form,
          //     time: tenseMap[time] || "present",
          //     face: face || 1,
          //     plural,
          //     nakl: !!nakl,
          //   });
          //   console.log(translation);
          // } else if (verbType === 1) {
          //   translation = convertNoun(root, {
          //     wcase,
          //     plural,
          //     rule: matched.rule,
          //     triggerRule: rule,
          //     triggerTranslate: matched.translate,
          //     time,
          //   });
          // }
        }

        if (!results.length)
          return res.json({ original: text, results: [], code: "" });

        results.sort((a, b) => (a.wcase ?? 0) - (b.wcase ?? 0));
        const code = await getOrCreateShortLink(text, "ru");
        return res.json({ original: text, results, code });
      }
    }
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function selectBestMatch(rows, baseWord) {
  const lowerBase = baseWord.toLowerCase();

  const candidates = rows.filter((row) => {
    const allForms = [
      ...(row.noun?.split(",") || []),
      ...(row.verb?.split(",") || []),
      ...(row.adverb?.split(",") || []),
      ...(row.izafet?.split(",") || []),
      ...(row.other?.split(",") || []),
    ]
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    return allForms.includes(lowerBase);
  });

  if (candidates.length === 1) return candidates[0];

  const scored = candidates.map((row) => {
    let score = 0;
    if (row.transcription) score += 2;
    if (row.info) score += 2;

    // Bonus for typical verb infinitives (e.g. durmaa, gitmää)
    if (row.word?.endsWith("maa") || row.word?.endsWith("mää")) score += 1;

    // Optional: boost entries with fewer fields (less ambiguity)
    const formCount = [
      row.noun,
      row.verb,
      row.adverb,
      row.izafet,
      row.other,
    ].filter(Boolean).length;
    score += 1 / (formCount || 1); // smaller = better

    return { row, score };
  });

  if (scored.length > 0) {
    scored.sort((a, b) => b.score - a.score);
    return scored[0].row;
  }

  return null;
}

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
