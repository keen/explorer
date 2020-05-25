import { Analysis } from '../types';

export const composeQueryParams = (analysis: Analysis, queryParams: any) => {
  if (queryParams.propertyNames) {
    delete queryParams.propertyNames;
  }

  if (analysis === 'funnel') {
    queryParams.eventCollection = undefined;
    queryParams.filters = undefined;
    queryParams.timeframe = undefined;
    queryParams.timezone = undefined;
  }

  if (!isNaN(queryParams.percentile)) {
    queryParams.percentile = parseInt(queryParams.percentile);
  }

  return queryParams;
};
