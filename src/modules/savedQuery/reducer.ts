import { ReducerState, SavedQuery } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState: ReducerState = {
  name: '',
  displayName: '',
  tags: [],
  isCloned: false,
  cached: false,
  refreshRate: 0,
  exists: false,
  isQueryEditable: true,
  isQueryLoading: false,
};

export const savedQuerySlice = createSlice({
  name: 'savedQuery',
  initialState,
  reducers: {
    updateSavedQuery: (
      state,
      { payload }: PayloadAction<Partial<SavedQuery>>
    ) => {
      return {
        ...state,
        ...payload,
      };
    },
    resetSavedQuery: () => {
      return initialState;
    },
    setQueryEditable: (state, { payload }: PayloadAction<boolean>) => {
      state.isQueryEditable = payload;
    },
    setQueryLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isQueryLoading = payload;
    },
  },
});
