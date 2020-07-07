export const CREATE_NEW_QUERY = '@queries/CREATE_NEW_QUERY';
export const RUN_QUERY = '@queries/RUN_QUERY';
export const RUN_QUERY_SUCCESS = '@queries/RUN_QUERY_SUCCESS';
export const RUN_QUERY_ERROR = '@queries/RUN_QUERY_ERROR';
export const SAVE_QUERY = '@queries/SAVE_QUERY';
export const SAVE_QUERY_SUCCESS = '@queries/SAVE_QUERY_SUCCESS';
export const SAVE_QUERY_ERROR = '@queries/SAVE_QUERY_ERROR';
export const DELETE_QUERY = '@queries/DELETE_QUERY';
export const DELETE_QUERY_SUCCESS = '@queries/DELETE_QUERY_SUCCESS';
export const DELETE_QUERY_ERROR = '@queries/DELETE_QUERY_ERROR';
export const GET_SAVED_QUERIES = '@queries/GET_SAVED_QUERIES';
export const GET_SAVED_QUERIES_SUCCESS = '@queries/GET_SAVED_QUERIES_SUCCESS';
export const GET_SAVED_QUERIES_ERROR = '@queries/GET_SAVED_QUERIES_ERROR';
export const SET_CACHE_QUERY_LIMIT = '@queries/CACHE_QUERY_LIMIT';
export const SET_CACHE_QUERY_LIMIT_ERROR =
  '@queries/SET_CACHE_QUERY_LIMIT_ERROR';

export const ERRORS = {
  OVER_LIMIT_ERROR: 'OverCachedQueryLimitError',
  TOO_MANY_QUERIES: 'TooManyCachedQueriesInTheCurrentBillingPeriod',
};
