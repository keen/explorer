/* eslint-disable @typescript-eslint/camelcase */
import { DEFAULT_TIMEZONE } from '../constants';

/**
 * Composes query settings ready to save in our API
 *
 * @param querySettings - query settings
 * @return visualization settings
 *
 */

const composeQuerySettings = (querySettings) => {
  const { analysis_type: analysisType, timezone } = querySettings;
  const initialQuery = {
    ...querySettings,
  };

  if (analysisType === 'funnel') {
    initialQuery.event_collection = undefined;
    initialQuery.filters = undefined;
    initialQuery.timeframe = undefined;
    initialQuery.timezone = undefined;
  }

  if (!timezone && analysisType !== 'funnel') {
    initialQuery.timezone = DEFAULT_TIMEZONE;
  }

  return initialQuery;
};

export default composeQuerySettings;
