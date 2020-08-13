import { MIN_PERCENTILE, MAX_PERCENTILE } from '../constants';

export const getPercentileValue = (
  value: number
): { value: number; outRange: boolean } => {
  if (value < MIN_PERCENTILE) return { value: MIN_PERCENTILE, outRange: true };
  if (value > MAX_PERCENTILE) return { value: MAX_PERCENTILE, outRange: true };
  return { value, outRange: false };
};
