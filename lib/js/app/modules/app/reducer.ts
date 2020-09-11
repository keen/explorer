import { ReducerState, AppActions } from './types';

import {
  APP_START,
  SHOW_CONFIRMATION,
  HIDE_CONFIRMATION,
  ACCEPT_CONFIRMATION,
  SET_VISUALIZATION_TYPE,
  SET_VIEW_MODE,
  SET_SCREEN_DIMENSION,
  SHOW_QUERY_SETTINGS_MODAL,
  HIDE_QUERY_SETTINGS_MODAL,
} from './constants';

export const initialState: ReducerState = {
  confirmModal: {
    visible: false,
    action: null,
    meta: null,
  },
  querySettingsModal: {
    visible: false,
    source: null,
  },
  browserScreen: {
    width: 0,
    height: 0,
  },
  view: 'browser',
  visualization: {
    type: null,
  },
};

export const appReducer = (
  state: ReducerState = initialState,
  action: AppActions
) => {
  switch (action.type) {
    case APP_START:
      return {
        ...state,
        view: action.payload.initialView,
      };
    case SET_SCREEN_DIMENSION:
      return {
        ...state,
        browserScreen: {
          height: action.payload.height,
          width: action.payload.width,
        },
      };
    case HIDE_QUERY_SETTINGS_MODAL:
      return {
        ...state,
        querySettingsModal: {
          ...state.querySettingsModal,
          source: null,
          visible: false,
        },
      };
    case SHOW_QUERY_SETTINGS_MODAL:
      return {
        ...state,
        querySettingsModal: {
          ...state.querySettingsModal,
          source: action.payload.source,
          visible: true,
        },
      };
    case SET_VIEW_MODE:
      return {
        ...state,
        view: action.payload.view,
      };
    case SET_VISUALIZATION_TYPE:
      return {
        ...state,
        visualization: {
          ...state.visualization,
          type: action.payload.type,
        },
      };
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
