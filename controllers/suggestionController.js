const db = require("../config/db");

const addSuggestion = async (req, res) => {
  const { key, source, suggest_translation } = req.body;

  // Validate API key
  if (!key || key !== "8afdfc7311ad1919036660f1833ecaa1") {
    return res.status(401).json({ success: false, message: "Invalid key" });
  }

  if (!source || !suggest_translation) {
    return res
      .status(400)
      .json({ success: false, message: "Missing parameters" });
  }

  try {
    const sanitizedSource = String(source).substring(0, 1000);
    const sanitizedSuggestion = String(suggest_translation).substring(0, 1000);

    const [result] = await db.execute(
      `INSERT INTO suggest (source, suggest) VALUES (?, ?)`,
      [sanitizedSource, sanitizedSuggestion]
    );

    if (result.insertId) {
      return res.status(200).json({ success: true, id: result.insertId });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Database insert failed" });
    }
  } catch (err) {
    console.error("Suggest error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  addSuggestion,
};
