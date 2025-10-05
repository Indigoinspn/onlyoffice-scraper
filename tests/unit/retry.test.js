const { retry } = require('../../src/utils/retry');

/**
 * Test that the retry utility:
 * - Executes the function again if it fails on the first attempt
 * - Returns the successful result on the second attempt
 * - Calls the function exactly 2 times (1 failure + 1 success)
 */

test('retries function on failure and succeeds on second attempt', async () => {
  let attempt = 0;
  const fn = jest.fn(() => {
    attempt++;
    if (attempt === 1) throw new Error('First attempt failed');
    return 'success';
  });

  const result = await retry(fn, 2, 10);

  expect(result).toBe('success');
  expect(fn).toHaveBeenCalledTimes(2);
});

/**
 * Test that the retry utility:
 * - Stops retrying after reaching maxRetries
 * - Throws a clear error message indicating the number of attempts
 * - Does not call the function more than maxRetries times
 */

test('throws error after max retries', async () => {
  const fn = jest.fn(() => {
    throw new Error('Always fails');
  });

  await expect(retry(fn, 2, 10)).rejects.toThrow('Retry failed after 2 attempts');
  expect(fn).toHaveBeenCalledTimes(2);
});
