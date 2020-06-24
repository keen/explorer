import { QueriesActions } from './types';

import {
  CREATE_NEW_QUERY,
  RUN_QUERY,
  RUN_QUERY_ERROR,
  RUN_QUERY_SUCCESS,
} from './constants';

export const createNewQuery = (): QueriesActions => ({
  type: CREATE_NEW_QUERY,
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
