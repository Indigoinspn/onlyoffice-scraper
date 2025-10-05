const { sortOfficesByLocality } = require('../../src/utils/sortOfficesByLocality');

test('sorts offices by Locality alphabetically (case-insensitive)', () => {
  const input = [{ Locality: 'Berlin' }, { Locality: 'amsterdam' }, { Locality: 'Zurich' }, { Locality: null }, { Locality: '' }];

  const result = sortOfficesByLocality(input);

  //Verify the order of non-empty values
  expect(result[0].Locality).toBe('amsterdam');
  expect(result[1].Locality).toBe('Berlin');
  expect(result[2].Locality).toBe('Zurich');

  // Empty values are moved to the end, but their original type is preserved
  expect(result[3].Locality).toBeNull();
  expect(result[4].Locality).toBe('');
});

test('does not mutate original array', () => {
  const input = [{ Locality: 'Paris' }, { Locality: 'London' }];
  const originalLength = input.length;

  sortOfficesByLocality(input);

  expect(input.length).toBe(originalLength);
  expect(input[0].Locality).toBe('Paris');
});
