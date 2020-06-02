import {
  SELECT_EVENT_COLLECTION,
  SELECT_ANALYSIS,
  SELECT_TARGET_PROPERTY,
  SET_PERCENTILE,
  SET_TIMEFRAME,
} from './constants';

import { QueryActions, Timeframe } from './types';
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

export const setPercentile = (percentile: number): QueryActions => ({
  type: SET_PERCENTILE,
  payload: {
    percentile,
  },
});

export const setTimeframe = (timeframe: Timeframe): QueryActions => ({
  type: SET_TIMEFRAME,
  payload: {
    timeframe,
  },
});
