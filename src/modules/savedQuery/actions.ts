import { createAction } from '@reduxjs/toolkit';
import {
  UPDATE_SAVED_QUERY,
  RESET_SAVED_QUERY,
  SELECT_SAVED_QUERY,
  SET_QUERY_EDITABLE,
  SET_QUERY_LOADING,
} from './constants';

import { ReducerState } from './types';

export const updateSavedQuery = createAction(
  UPDATE_SAVED_QUERY,
  (properties: Partial<ReducerState>) => ({
    payload: properties,
  })
);

export const selectSavedQuery = createAction(
  SELECT_SAVED_QUERY,
  (name: string, autorunQuery?: boolean) => ({
    payload: {
      name,
      autorunQuery,
    },
  })
);

export const setQueryEditable = createAction(
  SET_QUERY_EDITABLE,
  (isEditable: boolean) => ({
    payload: {
      isEditable,
    },
  })
);

export const setQueryLoading = createAction(
  SET_QUERY_LOADING,
  (isQueryLoading: boolean) => ({
    payload: {
      isQueryLoading,
    },
  })
);

export const resetSavedQuery = createAction(RESET_SAVED_QUERY);

export type SavedQueryActions =
  | ReturnType<typeof updateSavedQuery>
  | ReturnType<typeof resetSavedQuery>
  | ReturnType<typeof setQueryEditable>
  | ReturnType<typeof selectSavedQuery>
  | ReturnType<typeof setQueryLoading>;
