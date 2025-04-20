// utils/chunker.js

/**
 * Teilt einen Text in sinnvolle Wörter auf
 * Berücksichtigt Satzzeichen und Leerzeichen.
 */
exports.chunkText = (text) => {
  return text
    .toLowerCase()
    .split(/[\s.,!?;:"'()\-—–]+/)
    .filter(Boolean);
};
