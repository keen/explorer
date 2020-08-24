import {
  APP_START,
  LOAD_STATE_FROM_URL,
  COPY_SHARE_URL,
  SET_VISUALIZATION_TYPE,
  SHOW_CONFIRMATION,
  HIDE_CONFIRMATION,
  ACCEPT_CONFIRMATION,
  SET_VIEW_MODE,
  CLEAR_QUERY,
  CREATE_NEW_QUERY,
  EDIT_QUERY,
  SWITCH_TO_QUERIES_LIST,
  UPDATE_QUERY_CREATOR,
  QUERY_EDITOR_MOUNTED,
  SHOW_QUERY_SETTINGS_MODAL,
  HIDE_QUERY_SETTINGS_MODAL,
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
  querySettingsModal: {
    visible: boolean;
    source: SettingsModalSource;
  };
  view: ViewMode;
  visualization: {
    type: string | null;
  };
};

export interface AppStartAction {
  type: typeof APP_START;
}

export interface SwitchToQueriesListAction {
  type: typeof SWITCH_TO_QUERIES_LIST;
}

export interface CopyShareUrlAction {
  type: typeof COPY_SHARE_URL;
  payload: {
    query: Record<string, any>;
    savedQuery: Record<string, any>;
  };
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

export interface SetVisualizationType {
  type: typeof SET_VISUALIZATION_TYPE;
  payload: {
    type: string;
  };
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

export type AppActions =
  | AppStartAction
  | CopyShareUrlAction
  | EditQueryAction
  | QueryEditorMountedAction
  | ClearQueryAction
  | CreateNewQueryAction
  | UpdateQueryCreatorAction
  | SetViewModeAction
  | LoadPersistedStateAction
  | ShowConfirmationAction
  | HideConfirmationAction
  | AcceptConfirmationAction
  | SwitchToQueriesListAction
  | SetVisualizationType
  | ShowQuerySettingsModalAction
  | HideQuerySettingsModalAction;
