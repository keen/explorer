import { parseCustomInterval } from './parseCustomInterval';

test('should parse time unit for provided interval', () => {
  const interval = 'every_14_weeks';
  const { timeUnit } = parseCustomInterval(interval);

  expect(timeUnit).toEqual('weeks');
});

test('should parse value for provided interval', () => {
  const interval = 'every_14_weeks';
  const { value } = parseCustomInterval(interval);

  expect(value).toEqual(14);
});
