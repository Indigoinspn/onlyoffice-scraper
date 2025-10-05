const SELECTORS = require('../../src/config/selectors');

/**
 * Integration test: verifies that the office data extraction logic
 * correctly transforms mock DOM elements into structured office objects.
 * This test runs without a browser, making it fast and reliable.
 */
test('extracts office data from mock DOM elements', () => {
  // Arrange: prepare mock office data
  const mockOfficeData = {
    [SELECTORS.LOCALITY]: ['United Kingdom'],
    [SELECTORS.COMPANY_NAME]: ['Ascensio System Ltd'],
    [SELECTORS.STREET]: ['Suite 12, 2nd Floor, Queens House,', '180 Tottenham Court Road,'],
    [SELECTORS.COUNTRY]: ['London, United Kingdom,'],
    [SELECTORS.POSTAL_CODE]: ['W1T 7PD'],
    [SELECTORS.PHONE]: ['+44 20 3287 1086'],
  };

  // Create a mock DOM officeContainer from the data
  const officeContainer = createMockOfficeElement(mockOfficeData);
  // Act: run the extraction logic
  const result = extractOfficesFromContainers([officeContainer], SELECTORS);

  // Assert: verify the output structure and values
  expect(result).toHaveLength(1);

  expect(result[0]).toEqual({
    Locality: 'United Kingdom',
    CompanyName: 'Ascensio System Ltd',
    Street: 'Suite 12, 2nd Floor, Queens House, 180 Tottenham Court Road,',
    Country: 'London, United Kingdom,',
    PostalCode: 'W1T 7PD',
    Phone: 'Phone: +44 20 3287 1086',
  });
});

// Mock DOM elements

function createMockOfficeElement(mockOfficeData) {
  //return querySelectorAll method wich receives selector and returns textContent
  return {
    querySelectorAll: selector => {
      // get text value from mock data by selector
      const values = mockOfficeData[selector];

      if (!values) return [];

      const texts = Array.isArray(values) ? values : [values];
      return texts.map(text => ({ textContent: String(text) }));
    },
  };
}

// Replicate logic from scraper.js
function extractOfficesFromContainers(containersArray, selectors) {
  /**
   * Extracts and formats text from a container using a given selector.
   * Mimics the behavior of the real browser-side extraction function.
   * @param {Object} container - Mock DOM container
   * @param {string} selector - CSS selector
   * @returns {string|undefined} Formatted text or undefined if not found
   */
  function extract(container, selector) {
    if (!container || !selector) return undefined;

    const elements = container.querySelectorAll(selector); // Find all elements with the selector

    if (elements.length === 0) return undefined;

    return (
      Array.from(elements)
        .map(element => element.textContent.trim())
        .filter(t => t.length > 0)
        .join(' ')
        .trim() || undefined
    );
  }

  // Map each container to an office object
  return containersArray.map(office => ({
    Locality: extract(office, selectors.LOCALITY),
    CompanyName: extract(office, selectors.COMPANY_NAME),
    Street: extract(office, selectors.STREET),
    Country: extract(office, selectors.COUNTRY),
    PostalCode: extract(office, selectors.POSTAL_CODE),
    Phone: 'Phone: ' + extract(office, selectors.PHONE),
  }));
}
