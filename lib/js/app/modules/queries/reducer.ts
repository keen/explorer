import { ReducerState, QueriesActions } from './types';

import {
  SET_QUERY_SETTINGS,
  RUN_QUERY,
  RUN_QUERY_ERROR,
  RUN_QUERY_SUCCESS,
  GET_SAVED_QUERIES_SUCCESS,
  DELETE_QUERY_SUCCESS,
  SAVE_QUERY,
  SAVE_QUERY_SUCCESS,
  SAVE_QUERY_ERROR,
  SET_CACHE_QUERY_LIMIT,
  SET_CACHE_QUERY_LIMIT_EXCEED,
  SET_CACHE_QUERY_LIMIT_ERROR,
  RESET_QUERY_RESULTS,
  SET_QUERY_LIMIT_REACHED,
  RESET_SAVE_QUERY_ERROR,
} from './constants';

export const initialState: ReducerState = {
  settings: {},
  results: null,
  isQueryPerforming: false,
  isSavingQuery: false,
  isSavedQueriesLoaded: false,
  savedQueries: [],
  cachedQueries: {
    limit: null,
    limitReached: false,
  },
  queriesExecution: {
    limitReached: false,
  },
  saveQueryError: null,
  error: null,
};

export const queriesReducer = (
  state: ReducerState = initialState,
  action: QueriesActions
) => {
  switch (action.type) {
    case SET_QUERY_SETTINGS:
      return {
        ...state,
        settings: action.payload.settings,
      };
    case RESET_QUERY_RESULTS:
      return {
        ...state,
        results: null,
      };
    case SAVE_QUERY:
      return {
        ...state,
        saveQueryError: null,
        isSavingQuery: true,
      };
    case RESET_SAVE_QUERY_ERROR:
      return {
        ...state,
        saveQueryError: null,
      };
    case SAVE_QUERY_SUCCESS:
      return {
        ...state,
        saveQueryError: null,
        isSavingQuery: false,
      };
    case SAVE_QUERY_ERROR:
      return {
        ...state,
        saveQueryError: action.payload.error,
        isSavingQuery: false,
      };
    case SET_CACHE_QUERY_LIMIT_EXCEED:
      return {
        ...state,
        cachedQueries: {
          ...state.cachedQueries,
          limitReached: action.payload.limitReached,
        },
        isSavingQuery: false,
      };
    case SET_CACHE_QUERY_LIMIT:
      return {
        ...state,
        cachedQueries: {
          ...state.cachedQueries,
          limit: action.payload.limit,
        },
      };
    case SET_CACHE_QUERY_LIMIT_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case DELETE_QUERY_SUCCESS:
      return {
        ...state,
        savedQueries: state.savedQueries.filter(
          (item) => item.name !== action.payload.queryName
        ),
      };
    case GET_SAVED_QUERIES_SUCCESS:
      return {
        ...state,
        isSavedQueriesLoaded: true,
        savedQueries: action.payload.queries,
      };
    case RUN_QUERY: {
      return {
        ...state,
        error: null,
        isQueryPerforming: true,
      };
    }
    case RUN_QUERY_ERROR: {
      return {
        ...state,
        isQueryPerforming: false,
        error: action.payload.error,
      };
    }
    case RUN_QUERY_SUCCESS: {
      return {
        ...state,
        isQueryPerforming: false,
        results: action.payload.results,
      };
    }
    case SET_QUERY_LIMIT_REACHED:
      return {
        ...state,
        queriesExecution: {
          limitReached: action.payload.queriesExecutionLimitReached,
        },
      };
    default:
      return state;
  }
};
