import { createAction } from '@reduxjs/toolkit';
import { PickerWidgets } from '@keen.io/widget-picker';

import {
  APP_START,
  SWITCH_TO_QUERIES_LIST,
  LOAD_STATE_FROM_URL,
  SHOW_CONFIRMATION,
  HIDE_CONFIRMATION,
  ACCEPT_CONFIRMATION,
  SET_VISUALIZATION,
  RESET_VISUALIZATION,
  SET_VIEW_MODE,
  CREATE_NEW_QUERY,
  CLEAR_QUERY,
  EDIT_QUERY,
  UPDATE_QUERY_CREATOR,
  QUERY_EDITOR_MOUNTED,
  EXPLORER_MOUNTED,
  NOTIFICATIONS_MOUNTED,
  SHARE_QUERY_URL,
  SHOW_QUERY_SETTINGS_MODAL,
  HIDE_QUERY_SETTINGS_MODAL,
  SHOW_EMBED_MODAL,
  HIDE_EMBED_MODAL,
  SELECT_FIRST_QUERY,
  SCREEN_RESIZE,
  SET_SCREEN_DIMENSION,
  EXPORT_CHART_TO_IMAGE,
  EXPORT_CHART_TO_JSON,
  EXPORT_DATA_TO_CSV,
  COPY_EMBEDDED_CODE,
  DOWNLOAD_CODE_SNIPPET,
  SHOW_EMAIL_EXTRACTION_MODAL,
  HIDE_EMAIL_EXTRACTION_MODAL,
  COPY_API_RESOURCE_URL,
  SET_QUERY_AUTORUN,
  UPDATE_CHART_SETTINGS,
  UPDATE_WIDGET_SETTINGS,
  UPDATE_VISUALIZATION,
  SET_QUERIES_FILTERS,
  SET_QUERIES_SORT_SETTINGS,
  SHOW_UPDATE_SAVED_QUERY_MODAL,
  HIDE_UPDATE_SAVED_QUERY_MODAL,
} from './constants';

import {
  Confirmation,
  SettingsModalSource,
  ViewMode,
  QueriesFilters,
  QueriesSortSettings,
} from './types';
import { ChartSettings } from '../../types';

export const appStart = createAction(APP_START, (initialView: ViewMode) => ({
  payload: {
    initialView,
  },
}));

export const setQueryAutorun = createAction(
  SET_QUERY_AUTORUN,
  (autorun: boolean) => ({
    payload: {
      autorun,
    },
  })
);

export const resizeScreen = createAction(
  SCREEN_RESIZE,
  (width: number, height: number) => ({
    payload: { width, height },
  })
);

export const setScreenDimension = createAction(
  SET_SCREEN_DIMENSION,
  (width: number, height: number) => ({
    payload: { width, height },
  })
);

export const showEmailExtractionModal = createAction(
  SHOW_EMAIL_EXTRACTION_MODAL
);

export const hideEmailExtractionModal = createAction(
  HIDE_EMAIL_EXTRACTION_MODAL
);

export const selectFirstSavedQuery = createAction(SELECT_FIRST_QUERY);

export const switchToQueriesList = createAction(SWITCH_TO_QUERIES_LIST);

export const showQuerySettingsModal = createAction(
  SHOW_QUERY_SETTINGS_MODAL,
  (source: SettingsModalSource) => ({
    payload: {
      source,
    },
  })
);

export const hideQuerySettingsModal = createAction(HIDE_QUERY_SETTINGS_MODAL);

export const setViewMode = createAction(SET_VIEW_MODE, (view: ViewMode) => ({
  payload: {
    view,
  },
}));

export const queryEditorMounted = createAction(QUERY_EDITOR_MOUNTED);

export const explorerMounted = createAction(EXPLORER_MOUNTED);

export const notificationsMounted = createAction(NOTIFICATIONS_MOUNTED);

export const editQuery = createAction(EDIT_QUERY, (queryName: string) => ({
  payload: {
    queryName,
  },
}));

export const updateQueryCreator = createAction(
  UPDATE_QUERY_CREATOR,
  (query: Record<string, any>) => ({
    payload: {
      query,
    },
  })
);

export const createNewQuery = createAction(CREATE_NEW_QUERY);

export const clearQuery = createAction(CLEAR_QUERY);

export const shareQueryUrl = createAction(SHARE_QUERY_URL);

export const setVisualization = createAction(
  SET_VISUALIZATION,
  (
    type: PickerWidgets,
    chartSettings: ChartSettings,
    widgetSettings: Record<string, any>
  ) => ({
    payload: {
      type,
      chartSettings,
      widgetSettings,
    },
  })
);

export const resetVisualization = createAction(RESET_VISUALIZATION);

export const loadPersistedState = createAction(LOAD_STATE_FROM_URL);

export const showConfirmation = createAction(
  SHOW_CONFIRMATION,
  (confirmAction: Confirmation, meta?: Record<string, any>) => ({
    payload: {
      confirmAction,
      meta,
    },
  })
);

export const hideConfirmation = createAction(HIDE_CONFIRMATION);

export const acceptConfirmation = createAction(ACCEPT_CONFIRMATION);

export const exportChartToImage = createAction(
  EXPORT_CHART_TO_IMAGE,
  (quality?: number, backgroundColor?: string) => ({
    payload: {
      quality,
      backgroundColor,
    },
  })
);

export const exportChartToJson = createAction(EXPORT_CHART_TO_JSON);

export const exportDataToCsv = createAction(EXPORT_DATA_TO_CSV);

export const showEmbedModal = createAction(SHOW_EMBED_MODAL);

export const hideEmbedModal = createAction(HIDE_EMBED_MODAL);

export const copyEmbeddedCode = createAction(
  COPY_EMBEDDED_CODE,
  (projectId: string, readKey: string) => ({
    payload: {
      projectId,
      readKey,
    },
  })
);

export const downloadCodeSnippet = createAction(
  DOWNLOAD_CODE_SNIPPET,
  (projectId: string, readKey: string) => ({
    payload: {
      projectId,
      readKey,
    },
  })
);

export const updateChartSettings = createAction(
  UPDATE_CHART_SETTINGS,
  (chartSettings: Record<string, any>) => ({
    payload: {
      chartSettings,
    },
  })
);

export const updateWidgetSettings = createAction(
  UPDATE_WIDGET_SETTINGS,
  (widgetSettings: Record<string, any>) => ({
    payload: {
      widgetSettings,
    },
  })
);

export const updateVisualizationType = createAction(
  UPDATE_VISUALIZATION,
  (type: PickerWidgets) => ({
    payload: {
      type,
    },
  })
);

export const copyApiResourceUrl = createAction(
  COPY_API_RESOURCE_URL,
  (config: Record<string, any>) => ({
    payload: {
      config,
    },
  })
);

export const setQueriesFilters = createAction(
  SET_QUERIES_FILTERS,
  (filters: Partial<QueriesFilters>) => ({
    payload: {
      filters,
    },
  })
);

export const setQueriesSortSettings = createAction(
  SET_QUERIES_SORT_SETTINGS,
  (sortSettings: QueriesSortSettings) => ({
    payload: {
      sortSettings,
    },
  })
);

export const showUpdateSavedQueryModal = createAction(
  SHOW_UPDATE_SAVED_QUERY_MODAL
);

export const hideUpdateSavedQueryModal = createAction(
  HIDE_UPDATE_SAVED_QUERY_MODAL
);

export type AppActions =
  | ReturnType<typeof appStart>
  | ReturnType<typeof resizeScreen>
  | ReturnType<typeof setScreenDimension>
  | ReturnType<typeof shareQueryUrl>
  | ReturnType<typeof editQuery>
  | ReturnType<typeof queryEditorMounted>
  | ReturnType<typeof notificationsMounted>
  | ReturnType<typeof explorerMounted>
  | ReturnType<typeof clearQuery>
  | ReturnType<typeof createNewQuery>
  | ReturnType<typeof updateQueryCreator>
  | ReturnType<typeof setViewMode>
  | ReturnType<typeof loadPersistedState>
  | ReturnType<typeof showConfirmation>
  | ReturnType<typeof hideConfirmation>
  | ReturnType<typeof acceptConfirmation>
  | ReturnType<typeof switchToQueriesList>
  | ReturnType<typeof setVisualization>
  | ReturnType<typeof resetVisualization>
  | ReturnType<typeof showQuerySettingsModal>
  | ReturnType<typeof hideQuerySettingsModal>
  | ReturnType<typeof showEmbedModal>
  | ReturnType<typeof hideEmbedModal>
  | ReturnType<typeof copyEmbeddedCode>
  | ReturnType<typeof downloadCodeSnippet>
  | ReturnType<typeof selectFirstSavedQuery>
  | ReturnType<typeof selectFirstSavedQuery>
  | ReturnType<typeof showEmailExtractionModal>
  | ReturnType<typeof hideEmailExtractionModal>
  | ReturnType<typeof setQueryAutorun>
  | ReturnType<typeof updateChartSettings>
  | ReturnType<typeof updateWidgetSettings>
  | ReturnType<typeof updateVisualizationType>
  | ReturnType<typeof copyApiResourceUrl>
  | ReturnType<typeof setQueriesFilters>
  | ReturnType<typeof setQueriesSortSettings>
  | ReturnType<typeof showUpdateSavedQueryModal>
  | ReturnType<typeof hideUpdateSavedQueryModal>;
