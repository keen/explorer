import {
  SET_QUERY,
  SELECT_EVENT_COLLECTION,
  SELECT_ANALYSIS,
  SELECT_TARGET_PROPERTY,
  SET_PERCENTILE,
  SET_TIMEFRAME,
  SET_GROUP_BY,
  SET_ORDER_BY,
  SET_PROPERTY_NAMES,
  SET_LIMIT,
  SET_EXTRACTION_LIMIT,
  SELECT_TIMEZONE,
  ADD_FUNNEL_STEP,
  UPDATE_FUNNEL_STEP_EVENT_COLLECTION,
  UPDATE_FUNNEL_STEP,
  REMOVE_FUNNEL_STEP,
} from './constants';

import { QueryActions, ReducerState as Query } from './types';
import { Timezones, Timeframe, OrderBy, FunnelStep } from '../../types';
import { Analysis } from '../../../types';

export const setQuery = (query: Partial<Query>): QueryActions => ({
  type: SET_QUERY,
  payload: {
    query,
  },
});

export const setPropertyNames = (propertyNames: string[]) => ({
  type: SET_PROPERTY_NAMES,
  payload: {
    propertyNames,
  },
});

export const selectEventCollection = (name: string): QueryActions => ({
  type: SELECT_EVENT_COLLECTION,
  payload: {
    name,
  },
});

export const selectAnalysis = (analysis: Analysis): QueryActions => ({
  type: SELECT_ANALYSIS,
  payload: {
    analysis,
  },
});

export const selectTargetProperty = (property: string): QueryActions => ({
  type: SELECT_TARGET_PROPERTY,
  payload: {
    property,
  },
});

export const selectTimezone = (timezone: number | Timezones): QueryActions => ({
  type: SELECT_TIMEZONE,
  payload: {
    timezone,
  },
});

export const setPercentile = (percentile: number): QueryActions => ({
  type: SET_PERCENTILE,
  payload: {
    percentile,
  },
});

export const setGroupBy = (groupBy?: string | string[]): QueryActions => ({
  type: SET_GROUP_BY,
  payload: {
    groupBy,
  },
});

export const setOrderBy = (orderBy?: OrderBy[]): QueryActions => ({
  type: SET_ORDER_BY,
  payload: {
    orderBy,
  },
});

export const setLimit = (limit?: number): QueryActions => ({
  type: SET_LIMIT,
  payload: {
    limit,
  },
});

export const setExtractionLimit = (limit?: number): QueryActions => ({
  type: SET_EXTRACTION_LIMIT,
  payload: {
    limit,
  },
});

export const setTimeframe = (timeframe: Timeframe): QueryActions => ({
  type: SET_TIMEFRAME,
  payload: {
    timeframe,
  },
});

export const addFunnelStep = (): QueryActions => ({
  type: ADD_FUNNEL_STEP,
});

export const updateFunnelStep = (
  index: number,
  properties: Partial<FunnelStep>
): QueryActions => ({
  type: UPDATE_FUNNEL_STEP,
  payload: {
    index,
    properties,
  },
});

export const updateFunnelStepEventCollection = (
  name: string
): QueryActions => ({
  type: UPDATE_FUNNEL_STEP_EVENT_COLLECTION,
  payload: {
    name,
  },
});

export const removeFunnelStep = (index: number): QueryActions => ({
  type: REMOVE_FUNNEL_STEP,
  payload: {
    index,
  },
});
