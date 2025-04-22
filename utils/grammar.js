// utils/grammar.js

// Map vowels to their suffixes for Izafet
const vowelSuffixesIzafet = {
  a: "sı",
  ȇ: "sı",
  ı: "sı",
  ä: "si",
  e: "si",
  i: "si",
  o: "su",
  u: "su",
  ö: "sü",
  ü: "sü",
};

// Helper: Get last vowel for suffix logic
const getLastVowel = (word) => {
  const vowels = ["a", "ä", "e", "i", "ı", "o", "ö", "u", "ü"];
  for (let i = word.length - 1; i >= 0; i--) {
    if (vowels.includes(word[i])) return word[i];
  }
  return null;
};

// Helper: Get vowel harmony group
function getVowelGroup(vowel) {
  const groups = {
    "a,ȇ,ı,o,u": ["a", "ȇ", "ı", "o", "u"],
    "ä,e,i,ö,ü": ["ä", "e", "i", "ö", "ü"],
  };
  for (const [key, group] of Object.entries(groups)) {
    if (group.includes(vowel)) return key;
  }
  return null;
}

// Helper: Latin → Cyrillic transcription for Gagauz
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

// Helper: Get plural suffix if applicable
const getGagauzNounSuffix = (vowel, plural, wcase) => {
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

  const caseSuffixes = {
    2: {
      e: "nin",
      a: "nın",
      o: "nun",
      u: "nun",
      ä: "nin",
      ö: "nün",
      ü: "nün",
      i: "nin",
      ı: "nın",
    }, // Genitive
    3: {
      e: "ge",
      a: "ğa",
      o: "ğa",
      u: "ğa",
      ä: "gä",
      ö: "gä",
      ü: "gü",
      i: "ge",
      ı: "ğa",
    }, // Dative
    4: {
      e: "ni",
      a: "nı",
      o: "nu",
      u: "nu",
      ä: "ni",
      ö: "nü",
      ü: "nü",
      i: "ni",
      ı: "nı",
    }, // Accusative
    6: {
      e: "de",
      a: "da",
      o: "da",
      u: "da",
      ä: "dä",
      ö: "dä",
      ü: "dä",
      i: "de",
      ı: "da",
    }, // Prepositional
  };

  let suffix = "";

  if (plural) {
    suffix += pluralSuffix[vowel] || "lar";
  }

  if (wcase > 0 && caseSuffixes[wcase]) {
    suffix += caseSuffixes[wcase][vowel] || "";
  }

  return suffix;
};

// Izafet vowel addition logic
const izafetAddVowel = (word) => {
  const lastVowel = getLastVowel(word);
  const suffix = vowelSuffixesIzafet[lastVowel] || "";
  return word + suffix;
};

// Genitive case logic
const applyGenitiveCase = (word) => {
  const suffixes = {
    a: "ın",
    ä: "in",
    e: "in",
    i: "in",
    ı: "ın",
    o: "un",
    ö: "ün",
    u: "un",
    ü: "ün",
  };
  const lastVowel = getLastVowel(word);
  const suffix = suffixes[lastVowel] || "ın";
  return word + suffix;
};

// Dative case logic
const applyDativeCase = (word) => {
  const suffixes = {
    a: "a",
    ä: "ä",
    e: "ä",
    i: "ä",
    ı: "a",
    o: "a",
    ö: "ä",
    u: "a",
    ü: "ä",
  };
  const lastVowel = getLastVowel(word);
  const suffix = suffixes[lastVowel] || "a";
  return word + suffix;
};

// Accusative case logic
const applyAccusativeCase = (word) => {
  const suffixes = {
    a: "ı",
    ä: "i",
    e: "i",
    i: "i",
    ı: "ı",
    o: "u",
    ö: "ü",
    u: "u",
    ü: "ü",
  };
  const lastVowel = getLastVowel(word);
  const suffix = suffixes[lastVowel] || "ı";
  return word + suffix;
};

// Ablative case logic
const applyAblativeCase = (word) => {
  const suffixes = {
    a: "dan",
    ä: "dän",
    e: "dän",
    i: "dän",
    ı: "dan",
    o: "dan",
    ö: "dän",
    u: "dan",
    ü: "dän",
  };
  const lastVowel = getLastVowel(word);
  const suffix = suffixes[lastVowel] || "dan";
  return word + suffix;
};

// Locative case logic
const applyLocativeCase = (word) => {
  const suffixes = {
    a: "da",
    ä: "dä",
    e: "dä",
    i: "dä",
    ı: "da",
    o: "da",
    ö: "dä",
    u: "da",
    ü: "dä",
  };
  const lastVowel = getLastVowel(word);
  const suffix = suffixes[lastVowel] || "da";
  return word + suffix;
};

// Plural form logic
const applyPlural = (word) => {
  const suffixes = {
    a: "lar",
    ä: "lär",
    e: "lär",
    i: "lär",
    ı: "lar",
    o: "lar",
    ö: "lär",
    u: "lar",
    ü: "lär",
  };
  const lastVowel = getLastVowel(word);
  const suffix = suffixes[lastVowel] || "lar";
  return word + suffix;
};

// Simplified verb conjugation logic (present tense example)
const conjugateVerbPresent = (word, person = "third", plural = false) => {
  const suffixes = {
    first: { singular: "erim", plural: "eriz" },
    second: { singular: "ersin", plural: "ersiniz" },
    third: { singular: "er", plural: "erlär" },
  };

  const conjugation = suffixes[person][plural ? "plural" : "singular"];
  return word + conjugation;
};

function applyGrammarRules(rusWord, gagauzWord) {
  if (!gagauzWord || !gagauzWord.word) return null;

  let result = gagauzWord.word; // Use main word

  if (rusWord.plural === 1) {
    result += "лар"; // Gagauz plural example
  }

  if (rusWord.wcase === 2) {
    result += "нын"; // Example genitive
  }

  return result;
}

// Export all functions
module.exports = {
  izafetAddVowel,
  applyGenitiveCase,
  applyDativeCase,
  applyAccusativeCase,
  applyAblativeCase,
  applyLocativeCase,
  applyPlural,
  conjugateVerbPresent,
  getLastVowel,
  getVowelGroup,
  applyGrammarRules,
  transliterateToCyrillic,
  getGagauzNounSuffix,
};
