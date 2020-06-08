import {
  SELECT_EVENT_COLLECTION,
  SELECT_ANALYSIS,
  SELECT_TARGET_PROPERTY,
  SET_PERCENTILE,
  SET_TIMEFRAME,
  SET_GROUP_BY,
  SELECT_TIMEZONE,
  ADD_FUNNEL_STEP,
  UPDATE_FUNNEL_STEP_EVENT_COLLECTION,
  UPDATE_FUNNEL_STEP,
  REMOVE_FUNNEL_STEP,
} from './constants';

import { QueryActions } from './types';
import { Timezones, Timeframe, FunnelStep } from '../../types';
import { Analysis } from '../../../types';

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
