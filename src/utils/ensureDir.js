//Create directory if not exists
const fs = require('fs');
const path = require('path');

/**
 * Creates the directory for a file if it doesn't exist.
 * Works recursively (creates the entire directory path).
 *
 * @param {string} filePath - Full path to the file (e.g., 'data/offices.csv')
 * @returns {void}
 * @throws {Error} If the directory creation fails
 */

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    // Creates the directory (and any necessary parent directories)
    // synchronously if it doesn't already exist.
    fs.mkdirSync(dir, { recursive: true });
  }
}

module.exports = { ensureDir };
