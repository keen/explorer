import {
  UPDATE_SAVED_QUERY,
  RESET_SAVED_QUERY,
  SELECT_SAVED_QUERY,
} from './constants';

export type SavedQuery = {
  name: string;
  displayName: string;
  cached: boolean;
  isCloned: boolean;
  tags: string[];
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

export interface SelectSavedQueryAction {
  type: typeof SELECT_SAVED_QUERY;
  payload: {
    name: string;
    autorunQuery?: boolean;
  };
}

export type SavedQueryActions =
  | UpdateSavedQueryAction
  | ResetSavedQueryAction
  | SelectSavedQueryAction;
