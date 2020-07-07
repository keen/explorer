import { QueriesActions } from './types';

import {
  CREATE_NEW_QUERY,
  RUN_QUERY,
  RUN_QUERY_ERROR,
  RUN_QUERY_SUCCESS,
  GET_SAVED_QUERIES,
  GET_SAVED_QUERIES_ERROR,
  GET_SAVED_QUERIES_SUCCESS,
  DELETE_QUERY,
  DELETE_QUERY_ERROR,
  DELETE_QUERY_SUCCESS,
} from './constants';

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

export const createNewQuery = (): QueriesActions => ({
  type: CREATE_NEW_QUERY,
});

export const getSavedQueries = (): QueriesActions => ({
  type: GET_SAVED_QUERIES,
});

export const getSavedQueriesSuccess = (queries: Object[]): QueriesActions => ({
  type: GET_SAVED_QUERIES_SUCCESS,
  payload: { queries },
});

export const getSavedQueriesError = (error: Error): QueriesActions => ({
  type: GET_SAVED_QUERIES_ERROR,
  payload: { error },
});

export const runQuery = (body: Object): QueriesActions => ({
  type: RUN_QUERY,
  payload: { body },
});

export const runQuerySuccess = (results: Object): QueriesActions => ({
  type: RUN_QUERY_SUCCESS,
  payload: { results },
});

export const runQueryError = (error: Error): QueriesActions => ({
  type: RUN_QUERY_ERROR,
  payload: { error },
});
