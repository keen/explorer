import {
  SELECT_EVENT_COLLECTION,
  SELECT_ANALYSIS,
  SELECT_TARGET_PROPERTY,
  SET_PERCENTILE,
  SET_TIMEFRAME,
} from './constants';

import { Analysis } from '../../../types';

export type Timeframe =
  | string
  | {
      start: string;
      end: string;
    };

export type ReducerState = {
  eventCollection?: string;
  targetProperty?: string;
  percentile?: number;
  timeframe: Timeframe;
  analysis: Analysis;
};

export interface SelectEventCollectionAction {
  type: typeof SELECT_EVENT_COLLECTION;
  payload: {
    name: string;
  };
}

export interface SelectAnalysisAction {
  type: typeof SELECT_ANALYSIS;
  payload: {
    analysis: Analysis;
  };
}

export interface SelectTargetPropertyAction {
  type: typeof SELECT_TARGET_PROPERTY;
  payload: {
    property: string;
  };
}

export interface SetPercentileAction {
  type: typeof SET_PERCENTILE;
  payload: {
    percentile: number;
  };
}

export interface SetTimeframeAction {
  type: typeof SET_TIMEFRAME;
  payload: {
    timeframe: Timeframe;
  };
}

export type QueryActions =
  | SelectEventCollectionAction
  | SelectAnalysisAction
  | SelectTargetPropertyAction
  | SetPercentileAction
  | SetTimeframeAction;
