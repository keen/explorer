import { transformInterval } from './transformInterval';

test('should correctly transform interval string', () => {
  const result = transformInterval('every_14_days');

  expect(result).toBe('Every 14 days');
});
