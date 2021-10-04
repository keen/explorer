import { useCallback } from 'react';
import { getOffsetFromDate } from '@keen.io/time-utils';
import { Query } from '@keen.io/query';

export const usePresentationTimezone = (
  queryResults: Record<string, any> & { query?: Query }
) => {
  const getPresentationTimezone = useCallback(
    (queryResults) => {
      if ('query' in queryResults) {
        const {
          query: { timeframe, timezone },
        } = queryResults;
        if (typeof timeframe === 'string') return timezone;
        return getOffsetFromDate(timeframe.start);
      }

      return null;
    },
    [queryResults]
  );
  return { getPresentationTimezone };
};
