import { createAction } from '@reduxjs/toolkit';
import { Query } from '@keen.io/query';

export const extractToEmail = createAction('queries/extractToEmail');

export const runEmailExtraction = createAction(
  'queries/runEmailExtraction',
  (
    email: string,
    latest: number,
    contentType: string,
    contentEncoding?: string
  ) => ({
    payload: {
      email,
      latest,
      contentType,
      contentEncoding,
    },
  })
);

export const getOrganizationUsageLimits = createAction(
  'queries/getOrganizationUsageLimits'
);

export const deleteQuery = createAction(
  'queries/deleteQuery',
  (queryName: string) => ({
    payload: {
      queryName,
    },
  })
);

export const deleteQueryError = createAction(
  'queries/deleteQueryError',
  (error: Error) => ({
    payload: {
      error,
    },
  })
);

export const fetchSavedQueries = createAction('queries/fetchSavedQueries');

export const getSavedQueriesError = createAction(
  'queries/getSaveQueryError',
  (error: Error) => ({
    payload: {
      error,
    },
  })
);

export const runExtraction = createAction(
  'queries/runExtraction',
  (query: Query) => ({
    payload: {
      query,
    },
  })
);

export const cancelExtraction = createAction('queries/cancelExtraction');

export const continueExtraction = createAction('queries/continueExtraction');

export const cloneSavedQuery = createAction('queries/cloneSavedQuery');
