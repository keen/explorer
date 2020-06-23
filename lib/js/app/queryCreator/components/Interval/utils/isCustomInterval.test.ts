import { isCustomInterval } from './isCustomInterval';

test('should return "true" for custom interval', () => {
  const interval = 'every_30_minutes';

  expect(isCustomInterval(interval)).toBeTruthy();
});

test('should return "false" for supported interval', () => {
  const interval = 'daily';

  expect(isCustomInterval(interval)).toBeFalsy();
});

test('should return "false" for undefined interval', () => {
  const interval = undefined;

  expect(isCustomInterval(interval)).toBeFalsy();
});
