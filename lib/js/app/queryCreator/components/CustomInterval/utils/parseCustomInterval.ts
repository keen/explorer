import { INTERVAL_SEPARATOR } from '../constants';

export const parseCustomInterval = (interval: string) => {
  const [, value, timeUnit] = interval.split(INTERVAL_SEPARATOR);
  return { value: parseInt(value), timeUnit };
};
