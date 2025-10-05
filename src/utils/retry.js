// src/utils/retry.js

/**
 * Tries to execute async function with retries.
 *
 * @template T
 * @param {() => Promise<T>} fn - The asynchronous function to execute
 * @param {number} [maxRetries=3] - Maximum number of retry attempts
 * @param {number} [delayMs=1000] - Delay between retries (in milliseconds)
 * @returns {Promise<T>} The result of the successfully executed function
 * @throws {Error} If all retry attempts fail
 */

async function retry(fn, maxRetries = 3, delayMs = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(`❌  Retry failed after ${maxRetries} attempts: ${error.message}`);
      }
      console.log(`🔄 Attempt ${attempt} failed. Retrying in ${delayMs}ms...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
}

module.exports = { retry };
