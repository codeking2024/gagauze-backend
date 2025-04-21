const db = require("../config/db");

const resolveShortLink = async (req, res) => {
  const code = req.params.code?.trim();

  // Validate: 5 alphanumeric characters
  if (!/^[a-zA-Z0-9]{1,5}$/.test(code)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid code format" });
  }

  try {
    const [rows] = await db.execute(
      `SELECT text, direction FROM tlink WHERE code = ? LIMIT 1`,
      [code]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Translation not found" });
    }

    const { text, direction } = rows[0];

    return res.json({
      success: true,
      code,
      text,
      direction,
    });
  } catch (err) {
    console.error("Link resolve error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  resolveShortLink,
};
