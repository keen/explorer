/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Query } from '@keen.io/query';

import { ReducerState, SavedQueryListItem } from './types';
import { APIError } from '../../types';

export const initialState: ReducerState = {
  settings: {},
  results: null,
  isQueryPerforming: false,
  isSavingQuery: false,
  isSavedQueriesLoaded: false,
  savedQueries: [],
  extractionConfirmation: {
    isVisible: false,
  },
  cachedQueries: {
    limit: null,
    limitReached: false,
  },
  queriesExecution: {
    limitReached: false,
  },
  saveQueryError: null,
  error: null,
};

export const queriesSlice = createSlice({
  name: 'queries',
  initialState,
  reducers: {
    setExtractionConfirmation: (
      state,
      { payload }: PayloadAction<{ isVisible: boolean }>
    ) => {
      state.extractionConfirmation.isVisible = payload.isVisible;
    },
    setQueryPerforming: (
      state,
      { payload }: PayloadAction<{ isPerforming: boolean }>
    ) => {
      state.isQueryPerforming = payload.isPerforming;
    },
    setQuerySettings: (
      state,
      { payload }: PayloadAction<{ settings: Query }>
    ) => {
      state.settings = payload.settings;
    },
    resetQueryResults: (state) => {
      state.results = null;
    },
    saveQuery: (
      state,
      _: PayloadAction<{ name: string; body: Record<string, any> }>
    ) => {
      state.saveQueryError = null;
      state.isSavingQuery = true;
    },
    saveQuerySuccess: (
      state,
      _: PayloadAction<{ name: string; body: Record<string, any> }>
    ) => {
      state.saveQueryError = null;
      state.isSavingQuery = false;
    },
    setSaveQueryError: (
      state,
      { payload }: PayloadAction<{ error: APIError }>
    ) => {
      state.saveQueryError = payload.error;
      state.isSavingQuery = false;
    },
    resetSavedQueryError: (state) => {
      state.saveQueryError = null;
    },
    setQuerySaveState: (
      state,
      { payload }: PayloadAction<{ isSaving: boolean }>
    ) => {
      state.isSavingQuery = payload.isSaving;
    },
    setCacheQueryLimitExceed: (
      state,
      { payload }: PayloadAction<{ limitReached: boolean }>
    ) => {
      state.cachedQueries.limitReached = payload.limitReached;
      state.isSavingQuery = false;
    },
    setCacheQueryLimit: (
      state,
      { payload }: PayloadAction<{ limit: number }>
    ) => {
      state.cachedQueries.limit = payload.limit;
    },
    setQueryCacheLimitError: (
      state,
      { payload }: PayloadAction<{ error: APIError }>
    ) => {
      state.error = payload.error;
    },
    deleteQuerySuccess: (
      state,
      { payload }: PayloadAction<{ queryName: string }>
    ) => {
      state.savedQueries = state.savedQueries.filter(
        (item) => item.name !== payload.queryName
      );
    },
    getSavedQueriesSuccess: (
      state,
      { payload }: PayloadAction<{ queries: SavedQueryListItem[] }>
    ) => {
      state.isSavedQueriesLoaded = true;
      state.savedQueries = payload.queries;
    },
    runQuery: (state, _: PayloadAction<{ query: Query }>) => {
      state.error = null;
      state.results = null;
      state.isQueryPerforming = true;
    },
    runQueryError: (state, { payload }: PayloadAction<{ error: APIError }>) => {
      state.isQueryPerforming = false;
      state.error = payload.error;
    },
    runQuerySuccess: (
      state,
      { payload }: PayloadAction<{ results: Record<string, any> }>
    ) => {
      state.isQueryPerforming = false;
      state.results = payload.results;
    },
    setQueryLimitReached: (
      state,
      { payload }: PayloadAction<{ queriesExecutionLimitReached: boolean }>
    ) => {
      state.queriesExecution.limitReached =
        payload.queriesExecutionLimitReached;
    },
  },
});
