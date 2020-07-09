import { ReducerState, QueriesActions } from './types';

import {
  RUN_QUERY,
  RUN_QUERY_ERROR,
  RUN_QUERY_SUCCESS,
  GET_SAVED_QUERIES_SUCCESS,
  DELETE_QUERY_SUCCESS,
  SAVE_QUERY,
  SAVE_QUERY_SUCCESS,
  SAVE_QUERY_ERROR,
  SET_CACHE_QUERY_LIMIT,
  SET_CACHE_QUERY_LIMIT_ERROR,
  RESET_QUERY_RESULTS,
} from './constants';

export const initialState: ReducerState = {
  results: null,
  isLoading: false,
  isSavingQuery: false,
  saved: [],
  isLimited: false,
  error: null,
};

export const queriesReducer = (
  state: ReducerState = initialState,
  action: QueriesActions
) => {
  switch (action.type) {
    case RESET_QUERY_RESULTS:
      return {
        ...state,
        results: null,
      };
    case SAVE_QUERY:
      return {
        ...state,
        error: null,
        isSavingQuery: true,
      };
    case SAVE_QUERY_SUCCESS:
      return {
        ...state,
        isSavingQuery: false,
      };
    case SAVE_QUERY_ERROR:
      return {
        ...state,
        isSavingQuery: false,
      };
    case SET_CACHE_QUERY_LIMIT:
      return {
        ...state,
        isLimited: action.payload.limitReached,
        isSavingQuery: false,
      };
    case SET_CACHE_QUERY_LIMIT_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case DELETE_QUERY_SUCCESS:
      return {
        ...state,
        saved: state.saved.filter(
          (item) => item.query_name !== action.payload.queryName
        ),
      };
    case GET_SAVED_QUERIES_SUCCESS:
      return {
        ...state,
        saved: action.payload.queries,
      };
    case RUN_QUERY: {
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    }
    case RUN_QUERY_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    }
    case RUN_QUERY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        results: action.payload.results,
      };
    }
    default:
      return state;
  }
};
