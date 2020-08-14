/* eslint-disable @typescript-eslint/camelcase */
import { Query } from '../../types';

export const transformQuery = ({
  analysis_type,
  event_collection,
  target_property,
  filters,
  group_by,
  interval,
  limit,
  order_by,
  timeframe,
  timezone,
  percentile,
}: Record<string, any>): Query => ({
  analysisType: analysis_type,
  eventCollection: event_collection,
  targetProperty: target_property,
  filters,
  groupBy: group_by,
  interval,
  limit,
  orderBy: order_by,
  timeframe,
  timezone,
  percentile,
});
