const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { ensureDir } = require('../utils/ensureDir');

/**
 * @typedef {Object} Office
 * @property {string} [Locality]
 * @property {string} [CompanyName]
 * @property {string} [Street]
 * @property {string} [Country]
 * @property {string} [PostalCode]
 * @property {string} [Phone]
 */

/**
 Saves an array of offices to a CSV file at the specified path.
Automatically creates the directory if it does not exist.
 *
 * @param {Office[]} offices - The array of offices to save
 * @param {string} outputPath - Path to the output CSV file (e.g., 'data/offices.csv')
 * @returns {Promise<void>}
 * @throws {Error} If writing the file or creating the directory fails
 */

async function saveOfficesToCsv(offices, outputPath) {
  ensureDir(outputPath);

  const csvWriter = createCsvWriter({
    path: outputPath,
    header: [
      { id: 'Locality', title: 'Locality' },
      { id: 'CompanyName', title: 'CompanyName' },
      { id: 'Street', title: 'Street' },
      { id: 'Country', title: 'Country' },
      { id: 'PostalCode', title: 'PostalCode' },
      { id: 'Phone', title: 'Phone' },
    ],
    fieldDelimiter: ';',
    alwaysQuote: true,
  });

  await csvWriter.writeRecords(offices);
}

module.exports = { saveOfficesToCsv };
