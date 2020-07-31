import { QueriesActions } from './types';
import { APIError } from '../../types';

import {
  RUN_QUERY,
  RUN_QUERY_ERROR,
  RUN_QUERY_SUCCESS,
  GET_SAVED_QUERIES,
  GET_SAVED_QUERIES_ERROR,
  GET_SAVED_QUERIES_SUCCESS,
  DELETE_QUERY,
  DELETE_QUERY_ERROR,
  DELETE_QUERY_SUCCESS,
  SAVE_QUERY,
  SAVE_QUERY_ERROR,
  SAVE_QUERY_SUCCESS,
  SET_CACHE_QUERY_LIMIT,
  SET_CACHE_QUERY_LIMIT_ERROR,
  RESET_QUERY_RESULTS,
} from './constants';

export const resetQueryResults = (): QueriesActions => ({
  type: RESET_QUERY_RESULTS,
});

export const setQueryCacheLimit = (limitReached: boolean): QueriesActions => ({
  type: SET_CACHE_QUERY_LIMIT,
  payload: { limitReached },
});

export const setQueryCacheLimitError = (error: Error): QueriesActions => ({
  type: SET_CACHE_QUERY_LIMIT_ERROR,
  payload: { error },
});

export const saveQuery = (
  name: string,
  body: Record<string, any>
): QueriesActions => ({
  type: SAVE_QUERY,
  payload: { name, body },
});

export const saveQuerySuccess = (
  queryName: string,
  body: Record<string, any>
): QueriesActions => ({
  type: SAVE_QUERY_SUCCESS,
  payload: {
    queryName,
    body,
  },
});

export const saveQueryError = (error: Error): QueriesActions => ({
  type: SAVE_QUERY_ERROR,
  payload: { error },
});

export const deleteQuery = (queryName: string): QueriesActions => ({
  type: DELETE_QUERY,
  payload: { queryName },
});

export const deleteQuerySuccess = (queryName: string): QueriesActions => ({
  type: DELETE_QUERY_SUCCESS,
  payload: { queryName },
});

export const deleteQueryError = (error: Error): QueriesActions => ({
  type: DELETE_QUERY_ERROR,
  payload: { error },
});

export const getSavedQueries = (): QueriesActions => ({
  type: GET_SAVED_QUERIES,
});

export const getSavedQueriesSuccess = (
  queries: Record<string, any>[]
): QueriesActions => ({
  type: GET_SAVED_QUERIES_SUCCESS,
  payload: { queries },
});

export const getSavedQueriesError = (error: Error): QueriesActions => ({
  type: GET_SAVED_QUERIES_ERROR,
  payload: { error },
});

export const runQuery = (body: Record<string, any>): QueriesActions => ({
  type: RUN_QUERY,
  payload: { body },
});

export const runQuerySuccess = (
  results: Record<string, any>
): QueriesActions => ({
  type: RUN_QUERY_SUCCESS,
  payload: { results },
});

export const runQueryError = (error: APIError): QueriesActions => ({
  type: RUN_QUERY_ERROR,
  payload: { error },
});
