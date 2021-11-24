import { useCallback } from 'react';
import { Query } from '@keen.io/query';

export const usePresentationTimezone = (
  queryResults: Record<string, any> & { query?: Query }
) => {
  const getPresentationTimezone = useCallback(
    (queryResults) => {
      if ('query' in queryResults) {
        const {
          query: { timezone },
        } = queryResults;
        return timezone;
      }

      return null;
    },
    [queryResults]
  );
  return { getPresentationTimezone };
};
