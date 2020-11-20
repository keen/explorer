import { createAction } from '@reduxjs/toolkit';
import {
  UPDATE_SAVED_QUERY,
  RESET_SAVED_QUERY,
  SELECT_SAVED_QUERY,
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

export const resetSavedQuery = createAction(RESET_SAVED_QUERY);
