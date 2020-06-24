import {
  CREATE_NEW_QUERY,
  RUN_QUERY,
  RUN_QUERY_ERROR,
  RUN_QUERY_SUCCESS,
} from './constants';

export type ReducerState = {
  results: any;
  isLoading: boolean;
  isSavingQuery: boolean;
  saved: any[];
  isLimited: boolean;
};

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
  | CreateNewQueryAction;
