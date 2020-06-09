import { CREATE_NEW_QUERY } from './constants';

export type ReducerState = {
  saved: SavedQueryAPI[];
  isSavingQuery: boolean;
  isLimited: boolean;
};

type SavedQueryAPI = {
  query_name: string;
  refresh_rate: number;
  metadata: {
    display_name: string;
  };
};

export interface CreateNewQueryAction {
  type: typeof CREATE_NEW_QUERY;
}

export type QueriesActions = CreateNewQueryAction;
