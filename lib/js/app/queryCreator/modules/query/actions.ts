import {
  SERIALIZE_QUERY,
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
  SET_INTERVAL,
  SET_EXTRACTION_LIMIT,
  SET_EXTRACTION_RECIPIENT_EMAIL,
  SET_EXTRACTION_CONTENT_ENCODING,
  SET_FILTERS,
  SELECT_TIMEZONE,
  ADD_FUNNEL_STEP,
  SELECT_FUNNEL_STEP_EVENT_COLLECTION,
  UPDATE_FUNNEL_STEP,
  REMOVE_FUNNEL_STEP,
  RESET_EXTRACTION,
  RESET_QUERY,
  ADD_FILTER,
  UPDATE_FILTER,
  REMOVE_FILTER,
} from './constants';

import { QueryActions, ReducerState as Query } from './types';
import { Timezones, Timeframe, OrderBy, FunnelStep, Filter } from '../../types';
import { Analysis } from '../../../types';

export const setQuery = (query: Partial<Query>): QueryActions => ({
  type: SET_QUERY,
  payload: {
    query,
  },
});

export const serializeQuery = (query: Partial<Query>): QueryActions => ({
  type: SERIALIZE_QUERY,
  payload: {
    query,
  },
});

export const resetQuery = (): QueryActions => ({
  type: RESET_QUERY,
});

export const addFilter = (id: string): QueryActions => ({
  type: ADD_FILTER,
  payload: {
    id,
  },
});

export const removeFilter = (index: number): QueryActions => ({
  type: REMOVE_FILTER,
  payload: { index },
});

export const updateFilter = (
  index: number,
  filter: Partial<Filter>
): QueryActions => ({
  type: UPDATE_FILTER,
  payload: { index, filter },
});

export const setPropertyNames = (propertyNames: string[]): QueryActions => ({
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

export const selectTimezone = (timezone: Timezones): QueryActions => ({
  type: SELECT_TIMEZONE,
  payload: {
    timezone,
  },
});

export const setInterval = (interval: string): QueryActions => ({
  type: SET_INTERVAL,
  payload: {
    interval,
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

export const setExtractionRecipientEmail = (email?: string): QueryActions => ({
  type: SET_EXTRACTION_RECIPIENT_EMAIL,
  payload: {
    email,
  },
});

export const setExtractionContentEncoding = (
  contentEncoding?: string
): QueryActions => ({
  type: SET_EXTRACTION_CONTENT_ENCODING,
  payload: {
    contentEncoding,
  },
});

export const resetExtraction = (): QueryActions => ({
  type: RESET_EXTRACTION,
});

export const setTimeframe = (timeframe: Timeframe): QueryActions => ({
  type: SET_TIMEFRAME,
  payload: {
    timeframe,
  },
});

export const setFilters = (filters: Filter[]): QueryActions => ({
  type: SET_FILTERS,
  payload: {
    filters,
  },
});

export const addFunnelStep = (): QueryActions => ({
  type: ADD_FUNNEL_STEP,
});

export const selectFunnelStepCollection = (name: string): QueryActions => ({
  type: SELECT_FUNNEL_STEP_EVENT_COLLECTION,
  payload: {
    name,
  },
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

export const removeFunnelStep = (index: number): QueryActions => ({
  type: REMOVE_FUNNEL_STEP,
  payload: {
    index,
  },
});
