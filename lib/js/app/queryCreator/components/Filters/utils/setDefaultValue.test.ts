import { setDefaultValue } from './setDefaultValue';

test('returns default value for operator', () => {
  const result = setDefaultValue('Boolean', 'eq');

  expect(result).toEqual(true);
});
