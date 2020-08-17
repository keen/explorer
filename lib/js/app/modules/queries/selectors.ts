import { AppState } from '../types';

export const getSavedQueries = ({ queries }: AppState) => queries.saved;

export const getSaveQueryError = ({ queries }: AppState) =>
  queries.saveQueryError;

export const getQueriesSaving = ({ queries }: AppState) =>
  queries.isSavingQuery;

export const getQueryPerformState = ({ queries }: AppState) =>
  queries.isLoading;

export const getQueriesLimit = ({ queries }: AppState) => queries.isLimited;

export const getQueryResults = ({ queries }: AppState) => queries.results;

export const getQueryExecutionError = ({ queries }: AppState) => queries.error;
