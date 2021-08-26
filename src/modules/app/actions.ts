import { createAction } from '@reduxjs/toolkit';
import { PickerWidgets } from '@keen.io/widget-picker';

export const selectFirstSavedQuery = createAction('app/selectFirstQuery');
export const switchToQueriesList = createAction('app/switchToQueriesList');
export const queryEditorMounted = createAction('app/queryEditorMounted');
export const explorerMounted = createAction('app/explorerMounted');
export const notificationsMounted = createAction('app/notificationsMounted');
export const createNewQuery = createAction('app/createNewQuery');
export const clearQuery = createAction('app/clearQuery');
export const shareQueryUrl = createAction('app/shareQueryUrl');
export const loadPersistedState = createAction('app/loadPersistedState');
export const exportChartToJson = createAction('app/exportChartToJson');
export const exportDataToCsv = createAction('app/exportDataToCsv');
export const saveExistingQuery = createAction('app/saveExistingQuery');

export const editQuery = createAction('app/editQuery', (queryName: string) => ({
  payload: {
    queryName,
  },
}));

export const resizeScreen = createAction(
  'app/resizeScreen',
  (width: number, height: number) => ({
    payload: { width, height },
  })
);

export const updateQueryCreator = createAction(
  'app/updateQueryCreator',
  (query: Record<string, any>) => ({
    payload: {
      query,
    },
  })
);

export const exportChartToImage = createAction(
  'app/exportChartToImage',
  (quality?: number, backgroundColor?: string) => ({
    payload: {
      quality,
      backgroundColor,
    },
  })
);

export const copyEmbeddedCode = createAction(
  'app/copyEmbeddedCode',
  (projectId: string, readKey: string) => ({
    payload: {
      projectId,
      readKey,
    },
  })
);

export const downloadCodeSnippet = createAction(
  'app/downloadCodeSnippet',
  (projectId: string, readKey: string) => ({
    payload: {
      projectId,
      readKey,
    },
  })
);

export const updateChartSettings = createAction(
  'app/updateChartSettings',
  (chartSettings: Record<string, any>) => ({
    payload: {
      chartSettings,
    },
  })
);

export const updateWidgetSettings = createAction(
  'app/updateWidgetSettings',
  (widgetSettings: Record<string, any>) => ({
    payload: {
      widgetSettings,
    },
  })
);

export const updateVisualizationType = createAction(
  'app/updateVisualizationType',
  (type: PickerWidgets) => ({
    payload: {
      type,
    },
  })
);

export const copyApiResourceUrl = createAction(
  'app/copyApiResourceUrl',
  (config: Record<string, any>) => ({
    payload: {
      config,
    },
  })
);

export const saveQuery = createAction(
  'app/saveQuery',
  (displayName: string, refreshRate: number, tags: string[], name: string) => ({
    payload: {
      displayName,
      refreshRate,
      tags,
      name,
    },
  })
);
