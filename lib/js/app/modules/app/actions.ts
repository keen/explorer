import {
  APP_START,
  LOAD_STATE_FROM_URL,
  SHOW_CONFIRMATION,
  HIDE_CONFIRMATION,
  ACCEPT_CONFIRMATION,
  SET_VISUALIZATION_TYPE,
  SET_VIEW_MODE,
  CREATE_NEW_QUERY,
  CLEAR_QUERY,
  EDIT_QUERY,
  UPDATE_QUERY_CREATOR,
  QUERY_EDITOR_MOUNTED,
  COPY_SHARE_URL,
  SHOW_QUERY_SETTINGS_MODAL,
  HIDE_QUERY_SETTINGS_MODAL,
} from './constants';

import {
  AppActions,
  Confirmation,
  SettingsModalSource,
  ViewMode,
} from './types';

export const appStart = (): AppActions => ({
  type: APP_START,
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

export const copyShareUrl = (
  query: Record<string, any>,
  savedQuery: Record<string, any>
): AppActions => ({
  type: COPY_SHARE_URL,
  payload: {
    query,
    savedQuery,
  },
});

export const setVisualizationType = (type: string): AppActions => ({
  type: SET_VISUALIZATION_TYPE,
  payload: {
    type,
  },
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
