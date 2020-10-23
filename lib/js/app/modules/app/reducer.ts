import { ReducerState, AppActions } from './types';

import {
  APP_START,
  SHOW_CONFIRMATION,
  HIDE_CONFIRMATION,
  ACCEPT_CONFIRMATION,
  SET_VISUALIZATION,
  RESET_VISUALIZATION,
  SET_VIEW_MODE,
  SET_SCREEN_DIMENSION,
  SHOW_QUERY_SETTINGS_MODAL,
  HIDE_QUERY_SETTINGS_MODAL,
  SHOW_EMBED_MODAL,
  HIDE_EMBED_MODAL,
  SHOW_EMAIL_EXTRACTION_MODAL,
  HIDE_EMAIL_EXTRACTION_MODAL,
  SET_QUERY_AUTORUN,
  UPDATE_CHART_SETTINGS,
} from './constants';

export const initialState: ReducerState = {
  autorunQuery: false,
  confirmModal: {
    visible: false,
    action: null,
    meta: null,
  },
  querySettingsModal: {
    visible: false,
    source: null,
  },
  embedModal: {
    visible: false,
  },
  extractToEmailModal: {
    visible: false,
  },
  browserScreen: {
    width: 0,
    height: 0,
  },
  view: 'browser',
  visualization: {
    type: null,
    chartSettings: {},
    widgetSettings: {},
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
    case SET_QUERY_AUTORUN:
      return {
        ...state,
        autorunQuery: action.payload.autorun,
      };
    case SHOW_EMAIL_EXTRACTION_MODAL:
      return {
        ...state,
        extractToEmailModal: {
          ...state.extractToEmailModal,
          visible: true,
        },
      };
    case HIDE_EMAIL_EXTRACTION_MODAL:
      return {
        ...state,
        extractToEmailModal: {
          ...state.extractToEmailModal,
          visible: false,
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
    case SET_VISUALIZATION:
      return {
        ...state,
        visualization: {
          ...state.visualization,
          type: action.payload.type,
          chartSettings: {
            ...state.visualization.chartSettings,
            ...action.payload.chartSettings,
          },
          widgetSettings: {
            ...state.visualization.widgetSettings,
            ...action.payload.widgetSettings,
          },
        },
      };
    case RESET_VISUALIZATION:
      return {
        ...state,
        visualization: initialState.visualization,
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
    case SHOW_EMBED_MODAL:
      return {
        ...state,
        embedModal: {
          visible: true,
        },
      };
    case HIDE_EMBED_MODAL:
      return {
        ...state,
        embedModal: {
          visible: false,
        },
      };
    case UPDATE_CHART_SETTINGS:
      return {
        ...state,
        visualization: {
          ...state.visualization,
          chartSettings: {
            ...state.visualization.chartSettings,
            ...action.payload.chartSettings,
          },
        },
      };
    default:
      return state;
  }
};
