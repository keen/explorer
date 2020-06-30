import {
  SET_STATE_IN_URL,
  LOAD_STATE_FROM_URL,
  SHOW_CONFIRMATION,
  HIDE_CONFIRMATION,
  ACCEPT_CONFIRMATION,
  SET_VISUALIZATION_TYPE,
} from './constants';

import { AppActions, Confirmation } from './types';

export const persistState = (state: Object): AppActions => ({
  type: SET_STATE_IN_URL,
  payload: {
    state,
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
