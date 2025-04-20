const express = require("express");
const router = express.Router();
const db = require("../models/index"); // DB connection from mysql2 or custom pool

router.post("/translate", async (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Missing or invalid text input" });
  }

  try {
    const inputWord = text.trim().toLowerCase();

    // Try primary search: match against multiple fields
    const [primaryRows] = await db.execute(
      `
      SELECT word, noun, synonym FROM dict_gagauz
      WHERE 
        noun LIKE ? OR
        izafet LIKE ? OR
        verb LIKE ? OR
        adverb LIKE ? OR
        other LIKE ? OR
        future_or_past_perfect LIKE ?
      ORDER BY LENGTH(word) DESC
      LIMIT 1
    `,
      Array(6).fill(`%${inputWord}%`)
    );

    if (primaryRows.length > 0) {
      const row = primaryRows[0];
      return res.json({
        original: text,
        translation: row.word,
        synonyms: row.synonym
          ? row.synonym.split(",").map((s) => s.trim())
          : [],
      });
    }

    // Fallback: look inside synonyms
    const [fallbackRows] = await db.execute(
      `
      SELECT word, synonym FROM dict_gagauz
      WHERE synonym LIKE ?
      LIMIT 1
    `,
      [`%${inputWord}%`]
    );

    if (fallbackRows.length > 0) {
      const fallback = fallbackRows[0];
      return res.json({
        original: text,
        translation: fallback.word,
        synonyms: fallback.synonym
          ? fallback.synonym.split(",").map((s) => s.trim())
          : [],
      });
    }

    // If nothing found
    return res.json({
      original: text,
      translation: null,
      synonyms: [],
    });
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
