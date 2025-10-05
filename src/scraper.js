const { firefox } = require('playwright');
const config = require('./config');
const { retry } = require('./utils/retry');

/**
 * @typedef {Object} Office
 * @property {string} [Locality] - Город или регион офиса
 * @property {string} [CompanyName] - Название компании
 * @property {string} [Street] - Улица и номер здания
 * @property {string} [Country] - Страна
 * @property {string} [PostalCode] - Почтовый индекс
 * @property {string} [Phone] - Телефон (с префиксом "Phone: ")
 */

/**
 * Parses office data from the ONLYOFFICE website.
 * Navigates through the menu, waits for data to load, and extracts the information.
 * @returns {Promise<Office[]>}   An array of office data objects.
 * @throws {Error} If the page fails to load, elements cannot be found, or data extraction fails.
 */

async function scrapeOfficesData() {
  const { BASE_URL, SELECTORS, MESSAGES, TIMEOUTS } = config;
  const isDebug = process.env.DEBUG_MODE === 'true';

  // Config validations
  if (!BASE_URL || typeof BASE_URL !== 'string') {
    throw new Error('BASE_URL is not defined or not a string');
  }

  if (!SELECTORS || typeof SELECTORS !== 'object') {
    throw new Error('SELECTORS must be an object');
  }

  // Selectors that are required
  const requiredSelectors = [
    'OFFICE_CONTAINER',
    'RESOURCES_LINK',
    'CONTACTS_LINK',
    'LOCALITY',
    'COMPANY_NAME',
    'STREET',
    'COUNTRY',
    'POSTAL_CODE',
    'PHONE',
  ];

  for (const key of requiredSelectors) {
    if (!SELECTORS[key] || typeof SELECTORS[key] !== 'string') {
      throw new Error(`Selector "${key}" is missing or not a string`);
    }
  }

  const browser = await firefox.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('➡️ ', MESSAGES.START);
    console.log('🌐 Target URL:', BASE_URL);

    // 🔄 Retry for page.goto
    await retry(() => page.goto(BASE_URL, { timeout: TIMEOUTS.PAGE_LOAD }), 2, 2000);
    console.log('✅ ', MESSAGES.PAGE_LOADED, page.url());

    console.log('📖 ', MESSAGES.OPEN_RESOURCES_MENU);
    await page.hover(SELECTORS.RESOURCES_LINK);

    console.log('📞 ', MESSAGES.NAVIGATING_TO_CONTACTS);
    await retry(
      async () => {
        await page.waitForSelector(SELECTORS.CONTACTS_LINK, { timeout: 5000 });
        await page.click(SELECTORS.CONTACTS_LINK);
      },
      2,
      2000
    );

    console.log('⏳ ', MESSAGES.WAITING_FOR_OFFICES);
    await page.waitForSelector(SELECTORS.OFFICE_CONTAINER, { timeout: TIMEOUTS.ELEMENT_WAIT });

    console.log('♻️  ', MESSAGES.EXTRACTING);

    const offices = await page.$$eval(
      SELECTORS.OFFICE_CONTAINER,
      (containers, sel) => {
        function extract(container, selector) {
          if (!container || !selector) return undefined;

          const els = container.querySelectorAll(selector);
          if (els.length === 0) return undefined;

          return (
            Array.from(els)
              .map(el => el.textContent.trim())
              .filter(t => t.length > 0)
              .join(' ')
              .trim() || undefined
          );
        }

        return containers.map(office => ({
          Locality: extract(office, sel.LOCALITY),
          CompanyName: extract(office, sel.COMPANY_NAME),
          Street: extract(office, sel.STREET),
          Country: extract(office, sel.COUNTRY),
          PostalCode: extract(office, sel.POSTAL_CODE),
          Phone: 'Phone: ' + extract(office, sel.PHONE),
        }));
      },
      SELECTORS
    );

    // 🛡️ Validation of the result
    if (!offices || !Array.isArray(offices)) {
      throw new Error('❌ No offices data extracted or data is not an array');
    }

    if (offices.length === 0) {
      console.warn('⚠️ No offices found on page.');
    }

    if (isDebug) {
      await page.screenshot({ path: 'debug-screenshot.png' });
    }

    return offices;

    //If Errors...
  } catch (error) {
    const errorMessage = error.message || String(error);
    console.error('❌ SCRAPER ERROR:', errorMessage);

    if (isDebug) {
      try {
        await page.screenshot({ path: 'debug-error.png' });
        console.log('📸 Screenshot saved: debug-error.png');
      } catch (screenshotError) {
        console.warn('⚠️ Failed to save screenshot:', screenshotError.message);
      }
    }
    throw new Error(`Scraping failed: ${errorMessage}`);
  } finally {
    await browser.close();
  }
}

module.exports = { scrapeOfficesData };
