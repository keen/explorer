import { AppState } from '../types';

export const getSavedQueries = ({ queries }: AppState) => queries.saved;

export const getQueriesSaving = ({ queries }: AppState) =>
  queries.isSavingQuery;

export const getQueryPerformState = ({ queries }: AppState) =>
  queries.isLoading;

export const getQueriesLimit = ({ queries }: AppState) => queries.isLimited;

export const getQueryResults = ({ queries }: AppState) => queries.results;

export const getError = ({ queries }: AppState) => queries.error;

export const getQueryLimitReached = ({ queries }: AppState) => queries.limitReached;
