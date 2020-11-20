import { createAction } from '@reduxjs/toolkit';
import { SavedQueryListItem } from './types';
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
  CLONE_SAVED_QUERY,
} from './constants';

export const extractToEmail = createAction(EXTRACT_TO_EMAIL);

export const runEmailExtraction = createAction(
  RUN_EMAIL_EXTRACTION,
  (
    email: string,
    latest: number,
    contentType: string,
    contentEncoding?: string
  ) => ({
    payload: {
      email,
      latest,
      contentType,
      contentEncoding,
    },
  })
);

export const setQuerySettings = createAction(
  SET_QUERY_SETTINGS,
  (settings: Record<string, any>) => ({
    payload: {
      settings,
    },
  })
);

export const getOrganizationUsageLimits = createAction(
  GET_ORGANIZATION_USAGE_LIMITS
);

export const resetQueryResults = createAction(RESET_QUERY_RESULTS);

export const setCacheQueryLimitExceed = createAction(
  SET_CACHE_QUERY_LIMIT_EXCEED,
  (limitReached: boolean) => ({
    payload: {
      limitReached,
    },
  })
);

export const setCacheQueryLimit = createAction(
  SET_CACHE_QUERY_LIMIT,
  (limit: number) => ({
    payload: {
      limit,
    },
  })
);

export const setQueryCacheLimitError = createAction(
  SET_CACHE_QUERY_LIMIT_ERROR,
  (error: Error) => ({
    payload: {
      error,
    },
  })
);

export const saveQuery = createAction(
  SAVE_QUERY,
  (name: string, body: Record<string, any>) => ({
    payload: {
      name,
      body,
    },
  })
);

export const setQuerySaveState = createAction(
  SET_QUERY_SAVE_STATE,
  (isSaving: boolean) => ({
    payload: {
      isSaving,
    },
  })
);

export const saveQuerySuccess = createAction(
  SAVE_QUERY_SUCCESS,
  (queryName: string, body: Record<string, any>) => ({
    payload: {
      queryName,
      body,
    },
  })
);

export const saveQueryError = createAction(
  SAVE_QUERY_ERROR,
  (error: Error) => ({
    payload: {
      error,
    },
  })
);

export const resetSavedQueryError = createAction(RESET_SAVE_QUERY_ERROR);

export const deleteQuery = createAction(DELETE_QUERY, (queryName: string) => ({
  payload: {
    queryName,
  },
}));

export const deleteQuerySuccess = createAction(
  DELETE_QUERY_SUCCESS,
  (queryName: string) => ({
    payload: {
      queryName,
    },
  })
);

export const deleteQueryError = createAction(
  DELETE_QUERY_ERROR,
  (error: Error) => ({
    payload: {
      error,
    },
  })
);

export const getSavedQueries = createAction(GET_SAVED_QUERIES);

export const getSavedQueriesSuccess = createAction(
  GET_SAVED_QUERIES_SUCCESS,
  (queries: SavedQueryListItem[]) => ({
    payload: {
      queries,
    },
  })
);

export const getSavedQueriesError = createAction(
  GET_SAVED_QUERIES_ERROR,
  (error: Error) => ({
    payload: {
      error,
    },
  })
);

export const runQuery = createAction(
  RUN_QUERY,
  (body: Record<string, any>) => ({
    payload: {
      body,
    },
  })
);

export const runQuerySuccess = createAction(
  RUN_QUERY_SUCCESS,
  (results: Record<string, any>) => ({
    payload: {
      results,
    },
  })
);

export const runQueryError = createAction(
  RUN_QUERY_ERROR,
  (error: APIError) => ({
    payload: {
      error,
    },
  })
);

export const setQueryLimitReached = createAction(
  SET_QUERY_LIMIT_REACHED,
  (queriesExecutionLimitReached: boolean) => ({
    payload: {
      queriesExecutionLimitReached,
    },
  })
);

export const cloneSavedQuery = createAction(CLONE_SAVED_QUERY);
