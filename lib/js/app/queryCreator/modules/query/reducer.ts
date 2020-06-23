import {
  SELECT_EVENT_COLLECTION,
  SELECT_ANALYSIS,
  SELECT_TIMEZONE,
  SELECT_TARGET_PROPERTY,
  SET_QUERY,
  SET_PROPERTY_NAMES,
  SET_LIMIT,
  SET_EXTRACTION_LIMIT,
  SET_EXTRACTION_RECIPIENT_EMAIL,
  SET_EXTRACTION_CONTENT_ENCODING,
  SET_PERCENTILE,
  SET_TIMEFRAME,
  SET_GROUP_BY,
  SET_INTERVAL,
  SET_ORDER_BY,
  DEFAULT_ANALYSIS,
  DEFAULT_TIMEFRAME,
  ADD_FUNNEL_STEP,
  REMOVE_FUNNEL_STEP,
  UPDATE_FUNNEL_STEP,
  DEFAULT_FUNNEL_STEP,
  RESET_EXTRACTION,
} from './constants';

import { ReducerState, QueryActions } from './types';

export const initialState: ReducerState = {
  eventCollection: null,
  targetProperty: null,
  percentile: null,
  timezone: undefined,
  groupBy: undefined,
  orderBy: undefined,
  limit: undefined,
  interval: undefined,
  timeframe: DEFAULT_TIMEFRAME,
  analysisType: DEFAULT_ANALYSIS,
  steps: [],
  propertyNames: undefined,
  latest: undefined,
  email: undefined,
  contentEncoding: undefined,
};

export const queryReducer = (
  state: ReducerState = initialState,
  action: QueryActions
) => {
  switch (action.type) {
    case RESET_EXTRACTION:
      return {
        ...state,
        propertyNames: undefined,
        latest: undefined,
        email: undefined,
        contentEncoding: undefined,
      };
    case SET_QUERY:
      return {
        ...initialState,
        ...action.payload.query,
      };
    case SET_LIMIT:
      return {
        ...state,
        limit: action.payload.limit,
      };
    case SET_INTERVAL:
      return {
        ...state,
        interval: action.payload.interval,
      };
    case SET_EXTRACTION_LIMIT:
      return {
        ...state,
        latest: action.payload.limit,
      };
    case SET_EXTRACTION_RECIPIENT_EMAIL:
      return {
        ...state,
        email: action.payload.email,
      };
    case SET_EXTRACTION_CONTENT_ENCODING:
      return {
        ...state,
        contentEncoding: action.payload.contentEncoding,
      };
    case SET_PROPERTY_NAMES:
      return {
        ...state,
        propertyNames: action.payload.propertyNames,
      };
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
    case SET_ORDER_BY:
      return {
        ...state,
        orderBy: action.payload.orderBy,
      };
    case SET_GROUP_BY:
      return {
        ...state,
        groupBy: action.payload.groupBy,
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
        analysisType: action.payload.analysis,
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
