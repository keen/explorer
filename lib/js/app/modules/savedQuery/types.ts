import {
  UPDATE_SAVED_QUERY,
  RESET_SAVED_QUERY,
  SAVE_QUERY_SUCCESS,
  SELECT_SAVED_QUERY,
} from './constants';

export type SavedQuery = {
  name: string;
  displayName: string;
  cached: boolean;
  refreshRate: number;
  exists: boolean;
};

export type ReducerState = SavedQuery;

export interface UpdateSavedQueryAction {
  type: typeof UPDATE_SAVED_QUERY;
  payload: Partial<SavedQuery>;
}

export interface ResetSavedQueryAction {
  type: typeof RESET_SAVED_QUERY;
}

export interface SaveQuerySuccessAction {
  type: typeof SAVE_QUERY_SUCCESS;
}

export interface SelectSavedQueryAction {
  type: typeof SELECT_SAVED_QUERY;
  payload: {
    name: string;
  };
}

export type SavedQueryActions =
  | UpdateSavedQueryAction
  | ResetSavedQueryAction
  | SaveQuerySuccessAction
  | SelectSavedQueryAction;
