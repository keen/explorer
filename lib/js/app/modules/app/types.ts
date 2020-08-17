import {
  LOAD_STATE_FROM_URL,
  COPY_SHARE_URL,
  SET_VISUALIZATION_TYPE,
  SHOW_CONFIRMATION,
  HIDE_CONFIRMATION,
  ACCEPT_CONFIRMATION,
  SET_VIEW_MODE,
  CREATE_NEW_QUERY,
  EDIT_QUERY,
  UPDATE_QUERY_CREATOR,
  QUERY_EDITOR_MOUNTED,
  SHOW_QUERY_SETTINGS_MODAL,
  HIDE_QUERY_SETTINGS_MODAL,
} from './constants';

export type Confirmation = 'delete';

export type ViewMode = 'browser' | 'editor';

export type ReducerState = {
  confirmModal: {
    action: Confirmation;
    visible: boolean;
    meta?: Record<string, any>;
  };
  querySettingsModal: {
    visible: boolean;
  };
  view: ViewMode;
  visualization: {
    type: string | null;
  };
};

export interface CopyShareUrlAction {
  type: typeof COPY_SHARE_URL;
  payload: {
    query: Record<string, any>;
    savedQuery: Record<string, any>;
  };
}

export interface ShowQuerySettingsModalAction {
  type: typeof SHOW_QUERY_SETTINGS_MODAL;
}

export interface HideQuerySettingsModalAction {
  type: typeof HIDE_QUERY_SETTINGS_MODAL;
}

export interface CreateNewQueryAction {
  type: typeof CREATE_NEW_QUERY;
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
  | CopyShareUrlAction
  | EditQueryAction
  | QueryEditorMountedAction
  | CreateNewQueryAction
  | UpdateQueryCreatorAction
  | SetViewModeAction
  | LoadPersistedStateAction
  | ShowConfirmationAction
  | HideConfirmationAction
  | AcceptConfirmationAction
  | SetVisualizationType
  | ShowQuerySettingsModalAction
  | HideQuerySettingsModalAction;
