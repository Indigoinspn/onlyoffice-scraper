const fs = require('fs');
const path = require('path');
const { ensureDir } = require('../../src/utils/ensureDir');

const TEST_DIR = 'temp-test-dir';

afterEach(() => {
  if (fs.existsSync(TEST_DIR)) {
    fs.rmSync(TEST_DIR, { recursive: true });
  }
});

test('creates directory if it does not exist', () => {
  const filePath = path.join(TEST_DIR, 'file.txt');
  ensureDir(filePath);

  expect(fs.existsSync(TEST_DIR)).toBe(true);
});

test('does nothing if directory already exists', () => {
  fs.mkdirSync(TEST_DIR);
  const filePath = path.join(TEST_DIR, 'file.txt');

  expect(() => ensureDir(filePath)).not.toThrow();
});
