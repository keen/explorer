import {
  SELECT_EVENT_COLLECTION,
  SELECT_ANALYSIS,
  SELECT_TIMEZONE,
  SELECT_TARGET_PROPERTY,
  SET_PERCENTILE,
  SET_TIMEFRAME,
  DEFAULT_ANALYSIS,
  DEFAULT_TIMEFRAME,
  ADD_FUNNEL_STEP,
  REMOVE_FUNNEL_STEP,
  UPDATE_FUNNEL_STEP,
  DEFAULT_FUNNEL_STEP,
} from './constants';

import { ReducerState, QueryActions } from './types';

export const initialState: ReducerState = {
  eventCollection: null,
  targetProperty: null,
  percentile: null,
  timezone: undefined,
  timeframe: DEFAULT_TIMEFRAME,
  analysis: DEFAULT_ANALYSIS,
  steps: [],
};

export const queryReducer = (
  state: ReducerState = initialState,
  action: QueryActions
) => {
  switch (action.type) {
    case UPDATE_FUNNEL_STEP:
      return {
        ...state,
        steps: state.steps.map((step, index) => {
          if (index === action.payload.index) {
            return {
              ...step,
              ...action.payload.properties,
            };
          }
          return step;
        }),
      };
    case REMOVE_FUNNEL_STEP:
      return {
        ...state,
        steps: state.steps.filter(
          (_step, index) => index !== action.payload.index
        ),
      };
    case ADD_FUNNEL_STEP:
      return {
        ...state,
        steps: [...state.steps, DEFAULT_FUNNEL_STEP],
      };
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
    case SELECT_TIMEZONE:
      return {
        ...state,
        timezone: action.payload.timezone,
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
