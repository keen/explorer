import {
  PickerWidgets,
  ChartSettings,
  WidgetSettings,
} from '@keen.io/widget-picker';

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
  SET_QUERY_AUTORUN,
  UPDATE_CHART_SETTINGS,
} from './constants';

import {
  AppActions,
  Confirmation,
  SettingsModalSource,
  ViewMode,
} from './types';

export const appStart = (initialView: ViewMode): AppActions => ({
  type: APP_START,
  payload: { initialView },
});

export const setQueryAutorun = (autorun: boolean): AppActions => ({
  type: SET_QUERY_AUTORUN,
  payload: { autorun },
});

export const resizeScreen = (width: number, height: number): AppActions => ({
  type: SCREEN_RESIZE,
  payload: { width, height },
});

export const setScreenDimension = (
  width: number,
  height: number
): AppActions => ({
  type: SET_SCREEN_DIMENSION,
  payload: { width, height },
});

export const showEmailExtractionModal = (): AppActions => ({
  type: SHOW_EMAIL_EXTRACTION_MODAL,
});

export const hideEmailExtractionModal = (): AppActions => ({
  type: HIDE_EMAIL_EXTRACTION_MODAL,
});

export const selectFirstSavedQuery = (): AppActions => ({
  type: SELECT_FIRST_QUERY,
});

export const switchToQueriesList = (): AppActions => ({
  type: SWITCH_TO_QUERIES_LIST,
});

export const showQuerySettingsModal = (
  source: SettingsModalSource
): AppActions => ({
  type: SHOW_QUERY_SETTINGS_MODAL,
  payload: { source },
});

export const hideQuerySettingsModal = (): AppActions => ({
  type: HIDE_QUERY_SETTINGS_MODAL,
});

export const setViewMode = (view: ViewMode): AppActions => ({
  type: SET_VIEW_MODE,
  payload: { view },
});

export const queryEditorMounted = (): AppActions => ({
  type: QUERY_EDITOR_MOUNTED,
});

export const explorerMounted = (): AppActions => ({
  type: EXPLORER_MOUNTED,
});

export const notificationsMounted = (): AppActions => ({
  type: NOTIFICATIONS_MOUNTED,
});

export const editQuery = (queryName: string): AppActions => ({
  type: EDIT_QUERY,
  payload: {
    queryName,
  },
});

export const updateQueryCreator = (query: Record<string, any>): AppActions => ({
  type: UPDATE_QUERY_CREATOR,
  payload: { query },
});

export const createNewQuery = (): AppActions => ({
  type: CREATE_NEW_QUERY,
});

export const clearQuery = (): AppActions => ({
  type: CLEAR_QUERY,
});

export const shareQueryUrl = (): AppActions => ({
  type: SHARE_QUERY_URL,
});

export const setVisualization = (
  type: PickerWidgets,
  chartSettings: ChartSettings,
  widgetSettings: WidgetSettings
): AppActions => ({
  type: SET_VISUALIZATION,
  payload: {
    type,
    chartSettings,
    widgetSettings,
  },
});

export const resetVisualization = (): AppActions => ({
  type: RESET_VISUALIZATION,
});

export const loadPersitedState = (): AppActions => ({
  type: LOAD_STATE_FROM_URL,
});

export const showConfirmation = (
  confirmAction: Confirmation,
  meta?: Record<string, any>
): AppActions => ({
  type: SHOW_CONFIRMATION,
  payload: {
    confirmAction,
    meta,
  },
});

export const hideConfirmation = (): AppActions => ({
  type: HIDE_CONFIRMATION,
});

export const acceptConfirmation = (): AppActions => ({
  type: ACCEPT_CONFIRMATION,
});

export const exportChartToImage = () => ({
  type: EXPORT_CHART_TO_IMAGE,
});

export const exportChartToJson = () => ({
  type: EXPORT_CHART_TO_JSON,
});

export const exportDataToCsv = () => ({
  type: EXPORT_DATA_TO_CSV,
});

export const showEmbedModal = (): AppActions => ({
  type: SHOW_EMBED_MODAL,
});

export const hideEmbedModal = (): AppActions => ({
  type: HIDE_EMBED_MODAL,
});

export const copyEmbeddedCode = (
  projectId: string,
  readKey: string
): AppActions => ({
  type: COPY_EMBEDDED_CODE,
  payload: {
    projectId,
    readKey,
  },
});

export const downloadCodeSnippet = (
  projectId: string,
  readKey: string
): AppActions => ({
  type: DOWNLOAD_CODE_SNIPPET,
  payload: {
    projectId,
    readKey,
  },
});

export const updateChartSettings = (
  chartSettings: Record<string, any>
): AppActions => ({
  type: UPDATE_CHART_SETTINGS,
  payload: {
    chartSettings,
  },
});
