import { isComponentChange } from './isComponentChange';

test('returns "true" for operators with different component', () => {
  const result = isComponentChange('String', 'eq', 'exists');

  expect(result).toBeTruthy();
});

test('returns "false" for operators with the same component', () => {
  const result = isComponentChange('String', 'eq', 'ne');

  expect(result).toBeFalsy();
});
