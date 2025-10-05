#!/usr/bin/env node
const { scrapeOfficesData } = require('./scraper');
const { sortOfficesByLocality } = require('./utils/sortOfficesByLocality');
const { saveOfficesToCsv } = require('./services/saveOfficesToCsv');
const { MESSAGES } = require('./config');

/**
 * Main CLI script function.
 * Executes scraping, sorting, and saving of data.
 *
 * @param {string} outputPath - Path to the output CSV file
 * @returns {Promise<void>}
 */

async function main() {
  const outputPath = process.argv[2];

  if (!outputPath) {
    console.error(MESSAGES.ERROR.NO_PATH);
    process.exit(1);
  }

  try {
    // 1. Gathering data
    const offices = await scrapeOfficesData();
    console.log('🗺️  Scraped', offices.length, 'offices');

    // 2. Sorting
    const sortedOffices = sortOfficesByLocality(offices);

    // 3. Saving
    await saveOfficesToCsv(sortedOffices, outputPath);
    console.log('✍️ ', MESSAGES.SAVING_TO_FILE, outputPath);

    console.log(MESSAGES.SUCCESS(offices.length));
  } catch (error) {
    console.error('💥 CRITICAL ERROR:', error.message || error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
