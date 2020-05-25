import { SET_STATE_IN_URL, LOAD_STATE_FROM_URL } from './constants';

export interface PersistStateAction {
  type: typeof SET_STATE_IN_URL;
}

export interface LoadPersistedStateAction {
  type: typeof LOAD_STATE_FROM_URL;
}

export type AppActions = PersistStateAction | LoadPersistedStateAction;
