import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerState, SavedQuery, ConnectedDashboard } from './types';

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
  isConnectedDashboardsLoading: false,
  isConnectedDashboardsError: false,
  connectedDashboards: null,
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
    setConnectedDashboardsLoading: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isConnectedDashboardsLoading = payload;
    },
    setConnectedDashboardsError: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isConnectedDashboardsError = payload;
    },
    updateConnectedDashboards: (
      state,
      { payload }: PayloadAction<ConnectedDashboard[]>
    ) => {
      state.connectedDashboards = payload;
    },
  },
});
