import { FunnelStep } from '../../../types';

/**
 * Picks specific properties from previous funnel step
 *
 * @param steps - collection of funnel steps
 * @return funnel step settings
 *
 */
export const inheritFromPreviousStep = (steps: FunnelStep[]) => {
  if (steps.length) {
    const { timeframe, timezone } = steps[steps.length - 1];
    return {
      timeframe,
      timezone,
    };
  }

  return {};
};
