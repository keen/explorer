import {
  APP_START,
  FETCH_PROJECT_DETAILS,
  FETCH_PROJECT_DETAILS_SUCCESS,
  FETCH_PROJECT_DETAILS_ERROR,
} from './constants';

export interface AppStartAction {
  type: typeof APP_START;
}

export interface FetchProjectDetailsAction {
  type: typeof FETCH_PROJECT_DETAILS;
}

export interface FetchProjectDetailsSuccessAction {
  type: typeof FETCH_PROJECT_DETAILS_SUCCESS;
}

export interface FetchProjectDetailsErrorAction {
  type: typeof FETCH_PROJECT_DETAILS_ERROR;
  payload: {
    error: Error;
  };
}

export type AppActions =
  | AppStartAction
  | FetchProjectDetailsAction
  | FetchProjectDetailsSuccessAction
  | FetchProjectDetailsErrorAction;
