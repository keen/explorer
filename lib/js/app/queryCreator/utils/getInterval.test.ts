import { getInterval } from './getInterval';
import { TIME_UNITS } from '../constants';

describe('utils - getInterval()', () => {
  test('return interval for specific units', () => {
    const intervals = Object.keys(TIME_UNITS);

    Object.values(TIME_UNITS).forEach((units, idx) => {
      expect(getInterval(units)).toEqual(intervals[idx]);
    });
  });
});
