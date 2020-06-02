import {
  SELECT_EVENT_COLLECTION,
  SELECT_ANALYSIS,
  SELECT_TARGET_PROPERTY,
  SET_PERCENTILE,
  SET_TIMEFRAME,
  DEFAULT_ANALYSIS,
  DEFAULT_TIMEFRAME,
} from './constants';

import { ReducerState, QueryActions } from './types';

export const initialState: ReducerState = {
  eventCollection: null,
  targetProperty: null,
  percentile: null,
  timeframe: DEFAULT_TIMEFRAME,
  analysis: DEFAULT_ANALYSIS,
};

export const queryReducer = (
  state: ReducerState = initialState,
  action: QueryActions
) => {
  switch (action.type) {
    case SET_TIMEFRAME:
      return {
        ...state,
        timeframe: action.payload.timeframe,
      };
    case SET_PERCENTILE:
      return {
        ...state,
        percentile: action.payload.percentile,
      };
    case SELECT_TARGET_PROPERTY:
      return {
        ...state,
        targetProperty: action.payload.property,
      };
    case SELECT_ANALYSIS:
      return {
        ...state,
        analysis: action.payload.analysis,
      };
    case SELECT_EVENT_COLLECTION:
      return {
        ...state,
        eventCollection: action.payload.name,
      };
    default:
      return state;
  }
};
