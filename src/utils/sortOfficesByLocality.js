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
 * Sorts an array of office objects alphabetically by the 'Locality' field.
 * - Empty or missing 'Locality' values are treated as empty strings and appear at the end.
 * - Sorting is case-insensitive and locale-aware (using 'en' as base locale).
 * - The original array is not mutated; a new sorted array is returned.
 *
 * @param {Office[]} offices - Array of office objects. Each object should have a 'Locality' property.
 * @returns {Office[]} A new array of offices sorted by 'Locality'.
 */

function sortOfficesByLocality(offices) {
  // Create a shallow copy to avoid mutating the original array
  return [...offices].sort((a, b) => {
    // Normalize values: null/undefined → empty string
    const localityA = (a.Locality ?? '').trim();
    const localityB = (b.Locality ?? '').trim();

    // Push empty values to the end
    if (!localityA && !localityB) return 0;
    if (!localityA) return 1;
    if (!localityB) return -1;

    // Case-insensitive, locale-aware comparison
    return localityA.localeCompare(localityB, 'en', { sensitivity: 'base' });
  });
}

module.exports = { sortOfficesByLocality };
