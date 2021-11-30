import { createAction } from '@reduxjs/toolkit';

export const setQueryCreatorChartSettings = createAction(
  'SET_QUERY_CREATOR_CHART_SETTINGS',
  (chartSettings: Record<string, any>) => ({
    payload: {
      chartSettings,
    },
  })
);

export const editorSagaActions = {
  setQueryCreatorChartSettings,
};
