import {
  SET_STATE_IN_URL,
  LOAD_STATE_FROM_URL,
  SHOW_CONFIRMATION,
  HIDE_CONFIRMATION,
  ACCEPT_CONFIRMATION,
} from './constants';

import { AppActions, Confirmation } from './types';

export const persistState = (): AppActions => ({
  type: SET_STATE_IN_URL,
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
