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
