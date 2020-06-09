import { ReducerState, AppActions } from './types';

import {
  SHOW_CONFIRMATION,
  HIDE_CONFIRMATION,
  ACCEPT_CONFIRMATION,
} from './constants';

export const initialState: ReducerState = {
  confirmModal: {
    visible: false,
    action: null,
    meta: null,
  },
};

export const appReducer = (
  state: ReducerState = initialState,
  action: AppActions
) => {
  switch (action.type) {
    case ACCEPT_CONFIRMATION:
    case HIDE_CONFIRMATION:
      return {
        ...state,
        confirmModal: initialState.confirmModal,
      };
    case SHOW_CONFIRMATION:
      return {
        ...state,
        confirmModal: {
          visible: true,
          meta: action.payload.meta,
          action: action.payload.confirmAction,
        },
      };
    default:
      return state;
  }
};
