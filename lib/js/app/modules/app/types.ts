import {
  SET_STATE_IN_URL,
  LOAD_STATE_FROM_URL,
  SET_VISUALIZATION_TYPE,
  SHOW_CONFIRMATION,
  HIDE_CONFIRMATION,
  ACCEPT_CONFIRMATION,
} from './constants';

export type Confirmation = 'delete';

export type ReducerState = {
  confirmModal: {
    action: Confirmation;
    visible: boolean;
    meta?: Record<string, any>;
  };
  visualization: {
    type: string | null;
  };
};

export interface SetVisualizationType {
  type: typeof SET_VISUALIZATION_TYPE;
  payload: {
    type: string;
  };
}

export interface PersistStateAction {
  type: typeof SET_STATE_IN_URL;
  payload: {
    state: Object;
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
  | PersistStateAction
  | LoadPersistedStateAction
  | ShowConfirmationAction
  | HideConfirmationAction
  | AcceptConfirmationAction
  | SetVisualizationType;
