module.exports = {
  START: 'Starting scraper for:',
  PAGE_LOADED: 'Page loaded:',
  OPEN_RESOURCES_MENU: 'Opening Resources menu...',
  NAVIGATING_TO_CONTACTS: 'Navigating to Contacts...',
  IS_VISIBLE: 'is visible:',
  WAITING_FOR_OFFICES: 'Waiting for office data to load...',
  EXTRACTING: 'Extracting office data...',
  SAVING_TO_FILE: 'Saving data to file:',
  SUCCESS: count => `✅ Successfully scraped ${count} offices.`,
  ERROR: {
    GENERAL: err => `Unexpected error: ${err.message || err}`,
    NO_PATH: '❌ Please provide an output CSV path. Example: node src/cli.js data/offices.csv',
  },
};
