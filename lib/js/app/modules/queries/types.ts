import {
  CREATE_NEW_QUERY,
  RUN_QUERY,
  RUN_QUERY_ERROR,
  RUN_QUERY_SUCCESS,
  GET_SAVED_QUERIES,
  GET_SAVED_QUERIES_ERROR,
  GET_SAVED_QUERIES_SUCCESS,
} from './constants';

export type ReducerState = {
  results: any;
  isLoading: boolean;
  isSavingQuery: boolean;
  saved: any[];
  isLimited: boolean;
  error: Error | null;
};

export interface GetSavedQueriesAction {
  type: typeof GET_SAVED_QUERIES;
}

export interface GetSavedQueriesSuccessAction {
  type: typeof GET_SAVED_QUERIES_SUCCESS;
  payload: {
    queries: Object;
  };
}

export interface GetSavedQueriesErrorAction {
  type: typeof GET_SAVED_QUERIES_ERROR;
  payload: {
    error: Error;
  };
}

export interface RunQueryAction {
  type: typeof RUN_QUERY;
  payload: {
    body: Object;
  };
}

export interface RunQuerySuccessAction {
  type: typeof RUN_QUERY_SUCCESS;
  payload: {
    results: Object;
  };
}

export interface RunQueryErrorAction {
  type: typeof RUN_QUERY_ERROR;
  payload: {
    error: Error;
  };
}

export interface CreateNewQueryAction {
  type: typeof CREATE_NEW_QUERY;
}

export type QueriesActions =
  | RunQueryAction
  | RunQueryErrorAction
  | RunQuerySuccessAction
  | GetSavedQueriesAction
  | GetSavedQueriesSuccessAction
  | GetSavedQueriesErrorAction
  | CreateNewQueryAction;
