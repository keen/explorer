import {
  PickerWidgets,
  ChartSettings,
  WidgetSettings,
} from '@keen.io/widget-picker';

import {
  APP_START,
  LOAD_STATE_FROM_URL,
  SHARE_QUERY_URL,
  SET_VISUALIZATION,
  RESET_VISUALIZATION,
  SHOW_CONFIRMATION,
  HIDE_CONFIRMATION,
  ACCEPT_CONFIRMATION,
  SET_VIEW_MODE,
  CLEAR_QUERY,
  CREATE_NEW_QUERY,
  EDIT_QUERY,
  SELECT_FIRST_QUERY,
  SWITCH_TO_QUERIES_LIST,
  UPDATE_QUERY_CREATOR,
  QUERY_EDITOR_MOUNTED,
  EXPLORER_MOUNTED,
  NOTIFICATIONS_MOUNTED,
  SCREEN_RESIZE,
  SET_SCREEN_DIMENSION,
  SHOW_QUERY_SETTINGS_MODAL,
  HIDE_QUERY_SETTINGS_MODAL,
  SHOW_EMBED_MODAL,
  HIDE_EMBED_MODAL,
  COPY_EMBEDDED_CODE,
  DOWNLOAD_CODE_SNIPPET,
  SHOW_EMAIL_EXTRACTION_MODAL,
  HIDE_EMAIL_EXTRACTION_MODAL,
} from './constants';

export type Confirmation = 'delete';

export type ViewMode = 'browser' | 'editor';

export enum SettingsModalSource {
  QUERY_SETTINGS,
  FIRST_QUERY_SAVE,
}

export type ReducerState = {
  confirmModal: {
    action: Confirmation;
    visible: boolean;
    meta?: Record<string, any>;
  };
  extractToEmailModal: {
    visible: boolean;
  };
  querySettingsModal: {
    visible: boolean;
    source: SettingsModalSource;
  };
  embedModal: {
    visible: boolean;
  };
  view: ViewMode;
  browserScreen: {
    width: number;
    height: number;
  };
  visualization: {
    type: PickerWidgets | null;
    chartSettings: ChartSettings;
    widgetSettings: WidgetSettings;
  };
};

export interface ShowEmailExtractionModalction {
  type: typeof SHOW_EMAIL_EXTRACTION_MODAL;
}

export interface HideEmailExtractionModalction {
  type: typeof HIDE_EMAIL_EXTRACTION_MODAL;
}

export interface AppStartAction {
  type: typeof APP_START;
  payload: {
    initialView: ViewMode;
  };
}

export interface ResizeScreenAction {
  type: typeof SCREEN_RESIZE;
  payload: {
    width: number;
    height: number;
  };
}

export interface SetScreenDimensionAction {
  type: typeof SET_SCREEN_DIMENSION;
  payload: {
    width: number;
    height: number;
  };
}

export interface SelectFirstSavedQueryAction {
  type: typeof SELECT_FIRST_QUERY;
}

export interface SwitchToQueriesListAction {
  type: typeof SWITCH_TO_QUERIES_LIST;
}

export interface ShareQueryUrlAction {
  type: typeof SHARE_QUERY_URL;
}

export interface ShowQuerySettingsModalAction {
  type: typeof SHOW_QUERY_SETTINGS_MODAL;
  payload: { source: SettingsModalSource };
}

export interface HideQuerySettingsModalAction {
  type: typeof HIDE_QUERY_SETTINGS_MODAL;
}

export interface CreateNewQueryAction {
  type: typeof CREATE_NEW_QUERY;
}

export interface ClearQueryAction {
  type: typeof CLEAR_QUERY;
}

export interface EditQueryAction {
  type: typeof EDIT_QUERY;
  payload: {
    queryName: string;
  };
}

export interface QueryEditorMountedAction {
  type: typeof QUERY_EDITOR_MOUNTED;
}

export interface ExplorerMountedAction {
  type: typeof EXPLORER_MOUNTED;
}

export interface NotificationsMountedAction {
  type: typeof NOTIFICATIONS_MOUNTED;
}

export interface UpdateQueryCreatorAction {
  type: typeof UPDATE_QUERY_CREATOR;
  payload: { query: Record<string, any> };
}

export interface SetViewModeAction {
  type: typeof SET_VIEW_MODE;
  payload: {
    view: ViewMode;
  };
}

export interface SetVisualizationAction {
  type: typeof SET_VISUALIZATION;
  payload: {
    type: PickerWidgets;
    chartSettings: ChartSettings;
    widgetSettings: WidgetSettings;
  };
}

export interface ResetVisualizationAction {
  type: typeof RESET_VISUALIZATION;
}

export interface LoadPersistedStateAction {
  type: typeof LOAD_STATE_FROM_URL;
}

export interface ShowConfirmationAction {
  type: typeof SHOW_CONFIRMATION;
  payload: {
    confirmAction: Confirmation;
    meta?: Record<string, any>;
  };
}

export interface HideConfirmationAction {
  type: typeof HIDE_CONFIRMATION;
}

export interface AcceptConfirmationAction {
  type: typeof ACCEPT_CONFIRMATION;
}

export interface ShowEmbedModalAction {
  type: typeof SHOW_EMBED_MODAL;
}

export interface HideEmbedModalAction {
  type: typeof HIDE_EMBED_MODAL;
}

export interface CopyEmbeddedCodeAction {
  type: typeof DOWNLOAD_CODE_SNIPPET;
  payload: {
    projectId: string;
    readKey: string;
  };
}

export interface DownloadCodeSnippetAction {
  type: typeof COPY_EMBEDDED_CODE;
  payload: {
    projectId: string;
    readKey: string;
  };
}

export type AppActions =
  | AppStartAction
  | ResizeScreenAction
  | SetScreenDimensionAction
  | ShareQueryUrlAction
  | EditQueryAction
  | QueryEditorMountedAction
  | NotificationsMountedAction
  | ExplorerMountedAction
  | ClearQueryAction
  | CreateNewQueryAction
  | UpdateQueryCreatorAction
  | SetViewModeAction
  | LoadPersistedStateAction
  | ShowConfirmationAction
  | HideConfirmationAction
  | AcceptConfirmationAction
  | SwitchToQueriesListAction
  | SetVisualizationAction
  | ResetVisualizationAction
  | ShowQuerySettingsModalAction
  | HideQuerySettingsModalAction
  | ShowEmbedModalAction
  | HideEmbedModalAction
  | CopyEmbeddedCodeAction
  | DownloadCodeSnippetAction
  | SelectFirstSavedQueryAction
  | SelectFirstSavedQueryAction
  | ShowEmailExtractionModalction
  | HideEmailExtractionModalction;
