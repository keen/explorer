import { updateSavedQuery, selectSavedQuery, resetSavedQuery } from './actions';

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

export type SavedQueryActions =
  | ReturnType<typeof updateSavedQuery>
  | ReturnType<typeof resetSavedQuery>
  | ReturnType<typeof selectSavedQuery>;
