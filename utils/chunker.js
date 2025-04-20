function chunkText(text) {
  return text
    .split(" ")
    .map((w) => w.trim())
    .filter((w) => w.length > 0);
}

module.exports = {
  chunkText,
};
