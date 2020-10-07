import { QueriesActions, SavedQueryListItem } from './types';
import { APIError } from '../../types';

import {
  SET_QUERY_SETTINGS,
  RUN_QUERY,
  SET_QUERY_SAVE_STATE,
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
  SET_CACHE_QUERY_LIMIT_EXCEED,
  SET_CACHE_QUERY_LIMIT,
  SET_CACHE_QUERY_LIMIT_ERROR,
  SET_QUERY_LIMIT_REACHED,
  RESET_QUERY_RESULTS,
  RESET_SAVE_QUERY_ERROR,
  GET_ORGANIZATION_USAGE_LIMITS,
  EXTRACT_TO_EMAIL,
  RUN_EMAIL_EXTRACTION,
} from './constants';

export const extractToEmail = (): QueriesActions => ({
  type: EXTRACT_TO_EMAIL,
});

export const runEmailExtraction = (
  email: string,
  latest: number,
  contentType: string,
  contentEncoding?: string
): QueriesActions => ({
  type: RUN_EMAIL_EXTRACTION,
  payload: {
    email,
    latest,
    contentType,
    contentEncoding,
  },
});

export const setQuerySettings = (
  settings: Record<string, any>
): QueriesActions => ({
  type: SET_QUERY_SETTINGS,
  payload: { settings },
});

export const getOrganizationUsageLimits = (): QueriesActions => ({
  type: GET_ORGANIZATION_USAGE_LIMITS,
});

export const resetQueryResults = (): QueriesActions => ({
  type: RESET_QUERY_RESULTS,
});

export const setCacheQueryLimitExceed = (
  limitReached: boolean
): QueriesActions => ({
  type: SET_CACHE_QUERY_LIMIT_EXCEED,
  payload: { limitReached },
});

export const setCacheQueryLimit = (limit: number): QueriesActions => ({
  type: SET_CACHE_QUERY_LIMIT,
  payload: { limit },
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

export const setQuerySaveState = (isSaving: boolean): QueriesActions => ({
  type: SET_QUERY_SAVE_STATE,
  payload: {
    isSaving,
  },
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

export const resetSavedQueryError = (): QueriesActions => ({
  type: RESET_SAVE_QUERY_ERROR,
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
  queries: SavedQueryListItem[]
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

export const setQueryLimitReached = (
  queriesExecutionLimitReached: boolean
): QueriesActions => ({
  type: SET_QUERY_LIMIT_REACHED,
  payload: {
    queriesExecutionLimitReached,
  },
});
