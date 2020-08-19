import { AppState } from '../types';

export const getSavedQueries = ({ queries }: AppState) => queries.saved;

export const getSaveQueryError = ({ queries }: AppState) =>
  queries.saveQueryError;

export const getQueriesSaving = ({ queries }: AppState) =>
  queries.isSavingQuery;

export const getQueryPerformState = ({ queries }: AppState) =>
  queries.isLoading;

export const getCacheQueriesLimitExceed = ({ queries }: AppState) =>
  queries.cachedQueries.limitReached;

export const getCacheQueriesLimit = ({ queries }: AppState) =>
  queries.cachedQueries.limit;

export const getQueryResults = ({ queries }: AppState) => queries.results;

export const getQueryLimitReached = ({ queries }: AppState) =>
  queries.queriesExecution.limitReached;

export const getQueryExecutionError = ({ queries }: AppState) => queries.error;
