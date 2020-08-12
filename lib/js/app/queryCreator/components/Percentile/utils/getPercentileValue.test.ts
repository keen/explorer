import { getPercentileValue } from './getPercentileValue';
import { MIN_PERCENTILE, MAX_PERCENTILE } from '../constants';

test('should return MIN_PERCENTILE and true', () => {
  const { value, outRange } = getPercentileValue(-1);

  expect(value).toBe(MIN_PERCENTILE);
  expect(outRange).toBeTruthy();
});

test('should return MAX_PERCENTILE and true', () => {
  const { value, outRange } = getPercentileValue(102);

  expect(value).toBe(MAX_PERCENTILE);
  expect(outRange).toBeTruthy();
});

test('should return 50 and false', () => {
  const { value, outRange } = getPercentileValue(50);

  expect(value).toBe(50);
  expect(outRange).toBeFalsy();
});
