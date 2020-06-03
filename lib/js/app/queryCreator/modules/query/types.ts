import {
  SELECT_EVENT_COLLECTION,
  SELECT_ANALYSIS,
  SELECT_TARGET_PROPERTY,
  SET_PERCENTILE,
  SET_TIMEFRAME,
  SELECT_TIMEZONE,
  ADD_FUNNEL_STEP,
  REMOVE_FUNNEL_STEP,
  UPDATE_FUNNEL_STEP,
  UPDATE_FUNNEL_STEP_EVENT_COLLECTION,
  CHANGE_FUNNEL_STEPS_ORDER,
} from './constants';

import { Timezones, Timeframe, FunnelStep } from '../../types';
import { Analysis } from '../../../types';

export type ReducerState = {
  eventCollection?: string;
  targetProperty?: string;
  percentile?: number;
  timezone?: number | Timezones;
  timeframe: Timeframe;
  analysis: Analysis;
  steps: FunnelStep[];
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

export interface SelectTimezoneAction {
  type: typeof SELECT_TIMEZONE;
  payload: {
    timezone: number | Timezones;
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

export interface AddFunnelStepAction {
  type: typeof ADD_FUNNEL_STEP;
}

export interface RemoveFunnelStepAction {
  type: typeof REMOVE_FUNNEL_STEP;
  payload: {
    index: number;
  };
}

export interface UpdateFunnelStepAction {
  type: typeof UPDATE_FUNNEL_STEP;
  payload: {
    index: number;
    properties: Partial<FunnelStep>;
  };
}

export interface UpdateFunnelStepEventCollectionAction {
  type: typeof UPDATE_FUNNEL_STEP_EVENT_COLLECTION;
  payload: {
    name: string;
  };
}

export interface ChangeFunnelStepsOrderAction {
  type: typeof CHANGE_FUNNEL_STEPS_ORDER;
  payload: {
    index: number;
    updatedIndex: number;
  };
}

export type QueryActions =
  | SelectEventCollectionAction
  | SelectAnalysisAction
  | SelectTargetPropertyAction
  | SetPercentileAction
  | SetTimeframeAction
  | SelectTimezoneAction
  | AddFunnelStepAction
  | UpdateFunnelStepAction
  | RemoveFunnelStepAction
  | UpdateFunnelStepEventCollectionAction
  | ChangeFunnelStepsOrderAction;
