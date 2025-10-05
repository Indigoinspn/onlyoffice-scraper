const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { scrapeOfficesData } = require('../../src/scraper');
const { sortOfficesByLocality } = require('../../src/utils/sortOfficesByLocality');
const { saveOfficesToCsv } = require('../../src/services/saveOfficesToCsv');

const TEST_OUTPUT_PATH = 'data/test-offices-e2e.csv';

test.describe.configure({ mode: 'serial' });

test('E2E: should scrape real offices and save valid CSV', async () => {
  // 1. Scraping data
  const offices = await scrapeOfficesData();

  // 2. Checking data
  expect(offices).toBeInstanceOf(Array);
  expect(offices.length).toBeGreaterThan(0);

  const firstOffice = offices[0];
  expect(firstOffice).toHaveProperty('Locality');
  expect(firstOffice).toHaveProperty('CompanyName');
  expect(firstOffice.CompanyName).toBeTruthy();

  // 3. Sorting data
  const sortedOffices = sortOfficesByLocality(offices);
  expect(sortedOffices).toBeInstanceOf(Array);
  expect(sortedOffices.length).toBe(offices.length);

  // 4. Saving data to CSV file
  await saveOfficesToCsv(sortedOffices, TEST_OUTPUT_PATH);
  expect(fs.existsSync(TEST_OUTPUT_PATH)).toBe(true);

  // 5. Checking saved data
  const csvContent = fs.readFileSync(TEST_OUTPUT_PATH, 'utf8');
  expect(csvContent).toContain('"Locality";"CompanyName"'); //Titles
  expect(csvContent).toContain(sortedOffices[0].CompanyName); // First office company name

  const lastOffice = sortedOffices[sortedOffices.length - 1];
  expect(csvContent).toContain(lastOffice.CompanyName); // Last office company name
});
