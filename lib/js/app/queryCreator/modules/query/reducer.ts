import {
  SELECT_EVENT_COLLECTION,
  SELECT_ANALYSIS,
  SELECT_TIMEZONE,
  SELECT_TARGET_PROPERTY,
  SET_QUERY,
  SET_PROPERTY_NAMES,
  SET_LIMIT,
  SET_EXTRACTION_LIMIT,
  SET_PERCENTILE,
  SET_TIMEFRAME,
  SET_GROUP_BY,
  SET_INTERVAL,
  SET_ORDER_BY,
  SET_FILTERS,
  DEFAULT_ANALYSIS,
  DEFAULT_TIMEFRAME,
  DEFAULT_TIMEZONE,
  ADD_FUNNEL_STEP,
  SET_FUNNEL_STEPS,
  SET_FUNNEL_STEP_FILTERS,
  CLONE_FUNNEL_STEP,
  REMOVE_FUNNEL_STEP,
  UPDATE_FUNNEL_STEP,
  DEFAULT_FUNNEL_STEP,
  CHANGE_FUNNEL_STEPS_ORDER,
  ADD_FUNNEL_STEP_FILTER,
  UPDATE_FUNNEL_STEP_FILTER,
  REMOVE_FUNNEL_STEP_FILTER,
  UPDATE_FUNNEL_STEP_TIMEZONE,
  RESET_EXTRACTION,
  RESET_QUERY,
  ADD_FILTER,
  UPDATE_FILTER,
  REMOVE_FILTER,
  DEFAULT_FILTER,
  DEFAULT_EXTRACTION_LIMIT,
} from './constants';

import { inheritFromPreviousStep } from './utils';

import { ReducerState, QueryActions } from './types';

export const initialState: ReducerState = {
  eventCollection: null,
  targetProperty: null,
  percentile: undefined,
  timezone: DEFAULT_TIMEZONE,
  groupBy: undefined,
  orderBy: undefined,
  limit: undefined,
  interval: undefined,
  timeframe: DEFAULT_TIMEFRAME,
  analysisType: DEFAULT_ANALYSIS,
  steps: [],
  filters: [],
  propertyNames: undefined,
  latest: DEFAULT_EXTRACTION_LIMIT,
};

export const queryReducer = (
  state: ReducerState = initialState,
  action: QueryActions
) => {
  switch (action.type) {
    case ADD_FILTER:
      return {
        ...state,
        filters: [
          ...state.filters,
          { ...DEFAULT_FILTER, id: action.payload.id },
        ],
      };
    case REMOVE_FILTER:
      return {
        ...state,
        filters: state.filters.filter(
          (_filter) => _filter.id !== action.payload.id
        ),
      };
    case UPDATE_FILTER:
      return {
        ...state,
        filters: state.filters.map((filter) => {
          if (filter.id === action.payload.id) {
            return {
              ...filter,
              ...action.payload.filter,
            };
          }
          return filter;
        }),
      };
    case RESET_QUERY:
      return {
        ...initialState,
      };
    case RESET_EXTRACTION:
      return {
        ...state,
        propertyNames: undefined,
        latest: DEFAULT_EXTRACTION_LIMIT,
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
    case SET_PROPERTY_NAMES:
      return {
        ...state,
        propertyNames: action.payload.propertyNames,
      };
    case SET_FILTERS:
      return {
        ...state,
        filters: action.payload.filters,
      };
    case UPDATE_FUNNEL_STEP:
      return {
        ...state,
        steps: state.steps.map((step) => {
          if (step.id === action.payload.stepId) {
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
          (_step) => _step.id !== action.payload.stepId
        ),
      };
    case ADD_FUNNEL_STEP:
      return {
        ...state,
        steps: [
          ...state.steps,
          {
            ...DEFAULT_FUNNEL_STEP,
            ...inheritFromPreviousStep(state.steps),
            id: action.payload.id,
          },
        ],
      };
    case CLONE_FUNNEL_STEP:
      return {
        ...state,
        steps: [
          ...state.steps,
          ...state.steps
            .filter((step) => step.id === action.payload.cloneId)
            .map((step) => ({
              ...step,
              id: action.payload.newId,
            })),
        ],
      };
    case CHANGE_FUNNEL_STEPS_ORDER:
      return {
        ...state,
        steps: action.payload.steps.map((step, idx) => {
          if (idx === 0) {
            return {
              ...step,
              inverted: false,
              optional: false,
            };
          }
          return step;
        }),
      };
    case SET_FUNNEL_STEPS:
      return {
        ...state,
        steps: action.payload.steps,
      };
    case ADD_FUNNEL_STEP_FILTER:
      return {
        ...state,
        steps: state.steps.map((step) => {
          if (step.id === action.payload.stepId) {
            return {
              ...step,
              filters: [
                ...step.filters,
                {
                  id: action.payload.filterId,
                  ...DEFAULT_FILTER,
                },
              ],
            };
          }
          return step;
        }),
      };
    case SET_FUNNEL_STEP_FILTERS:
      return {
        ...state,
        steps: state.steps.map((step) => {
          if (step.id === action.payload.stepId) {
            return {
              ...step,
              filters: action.payload.filters,
            };
          }
          return step;
        }),
      };
    case UPDATE_FUNNEL_STEP_FILTER:
      return {
        ...state,
        steps: state.steps.map((step) => {
          if (step.id === action.payload.stepId) {
            return {
              ...step,
              filters: step.filters.map((filter) => {
                if (filter.id === action.payload.filterId) {
                  return {
                    ...filter,
                    ...action.payload.properties,
                  };
                }
                return filter;
              }),
            };
          }
          return step;
        }),
      };
    case REMOVE_FUNNEL_STEP_FILTER:
      return {
        ...state,
        steps: state.steps.map((step) => {
          if (step.id === action.payload.stepId) {
            return {
              ...step,
              filters: step.filters.filter(
                (filter) => filter.id !== action.payload.filterId
              ),
            };
          }
          return step;
        }),
      };
    case UPDATE_FUNNEL_STEP_TIMEZONE:
      return {
        ...state,
        steps: state.steps.map((step) => {
          if (step.id === action.payload.stepId) {
            return {
              ...step,
              timezone: action.payload.timezone,
            };
          }
          return step;
        }),
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
