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
  SET_FILTERS,
  SELECT_TIMEZONE,
  ADD_FUNNEL_STEP,
  CLONE_FUNNEL_STEP,
  SELECT_FUNNEL_STEP_EVENT_COLLECTION,
  UPDATE_FUNNEL_STEP,
  REMOVE_FUNNEL_STEP,
  SET_FUNNEL_STEPS,
  SET_FUNNEL_STEP_FILTERS,
  CHANGE_FUNNEL_STEPS_ORDER,
  ADD_FUNNEL_STEP_FILTER,
  UPDATE_FUNNEL_STEP_FILTER,
  REMOVE_FUNNEL_STEP_FILTER,
  RESET_EXTRACTION,
  RESET_QUERY,
  ADD_FILTER,
  UPDATE_FILTER,
  REMOVE_FILTER,
  UPDATE_FUNNEL_STEP_TIMEZONE,
} from './constants';

import { QueryActions, ReducerState as Query, InitialQuery } from './types';
import {
  Timezones,
  Timeframe,
  OrderBy,
  FunnelStep,
  ExtractionProperty,
  Filter,
} from '../../types';
import { Analysis } from '../../../types';

export const setQuery = (query: Partial<Query>): QueryActions => ({
  type: SET_QUERY,
  payload: {
    query,
  },
});

export const serializeQuery = (query: Partial<InitialQuery>): QueryActions => ({
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

export const removeFilter = (id: string): QueryActions => ({
  type: REMOVE_FILTER,
  payload: { id },
});

export const updateFilter = (
  id: string,
  filter: Partial<Filter>
): QueryActions => ({
  type: UPDATE_FILTER,
  payload: { id, filter },
});

export const setPropertyNames = (
  propertyNames: ExtractionProperty[]
): QueryActions => ({
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

export const addFunnelStep = (id: string): QueryActions => ({
  type: ADD_FUNNEL_STEP,
  payload: {
    id,
  },
});

export const cloneFunnelStep = (
  cloneId: string,
  newId: string
): QueryActions => ({
  type: CLONE_FUNNEL_STEP,
  payload: {
    cloneId,
    newId,
  },
});
export const selectFunnelStepCollection = (name: string): QueryActions => ({
  type: SELECT_FUNNEL_STEP_EVENT_COLLECTION,
  payload: {
    name,
  },
});

export const updateFunnelStep = (
  stepId: string,
  properties: Partial<FunnelStep>
): QueryActions => ({
  type: UPDATE_FUNNEL_STEP,
  payload: {
    stepId,
    properties,
  },
});

export const changeFunnelStepsOrder = (steps: FunnelStep[]): QueryActions => ({
  type: CHANGE_FUNNEL_STEPS_ORDER,
  payload: { steps },
});

export const setFunnelSteps = (steps: FunnelStep[]): QueryActions => ({
  type: SET_FUNNEL_STEPS,
  payload: { steps },
});

export const setFunnelStepFilters = (
  stepId: string,
  filters: Filter[]
): QueryActions => ({
  type: SET_FUNNEL_STEP_FILTERS,
  payload: {
    stepId,
    filters,
  },
});

export const removeFunnelStep = (stepId: string): QueryActions => ({
  type: REMOVE_FUNNEL_STEP,
  payload: {
    stepId,
  },
});

export const addFunnelStepFilter = (
  stepId: string,
  filterId: string
): QueryActions => ({
  type: ADD_FUNNEL_STEP_FILTER,
  payload: {
    stepId,
    filterId,
  },
});

export const updateFunnelStepFilter = (
  stepId: string,
  filterId: string,
  properties: Filter
): QueryActions => ({
  type: UPDATE_FUNNEL_STEP_FILTER,
  payload: {
    stepId,
    filterId,
    properties,
  },
});

export const removeFunnelStepFilter = (
  stepId: string,
  filterId: string
): QueryActions => ({
  type: REMOVE_FUNNEL_STEP_FILTER,
  payload: {
    stepId,
    filterId,
  },
});

export const updateFunnelStepTimezone = (
  stepId: string,
  timezone: Timezones
): QueryActions => ({
  type: UPDATE_FUNNEL_STEP_TIMEZONE,
  payload: {
    stepId,
    timezone,
  },
});
