import { createAction } from '@reduxjs/toolkit';

export const selectSavedQuery = createAction(
  'savedQuery/selectSavedQuery',
  (name: string, autorunQuery?: boolean) => ({
    payload: {
      name,
      autorunQuery,
    },
  })
);

export const getDashboardsConnection = createAction(
  'savedQuery/getDashboardsConnection',
  (name: string) => ({
    payload: {
      name,
    },
  })
);

export const getDashboardsConnectionDone = createAction(
  'savedQuery/getDashboardsConnectionDone'
);
