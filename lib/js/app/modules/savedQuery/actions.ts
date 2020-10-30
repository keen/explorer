import {
  UPDATE_SAVED_QUERY,
  RESET_SAVED_QUERY,
  SELECT_SAVED_QUERY,
} from './constants';

import { SavedQueryActions, ReducerState } from './types';

export const updateSaveQuery = (
  properties: Partial<ReducerState>
): SavedQueryActions => ({
  type: UPDATE_SAVED_QUERY,
  payload: properties,
});

export const selectSavedQuery = (
  name: string,
  autorunQuery?: boolean
): SavedQueryActions => ({
  type: SELECT_SAVED_QUERY,
  payload: {
    name,
    autorunQuery,
  },
});

export const resetSavedQuery = (): SavedQueryActions => ({
  type: RESET_SAVED_QUERY,
});
