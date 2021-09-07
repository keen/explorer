import { ReducerState } from './types';
import { AppActions } from './actions';

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
  UPDATE_WIDGET_SETTINGS,
  SET_QUERIES_FILTERS,
  SET_QUERIES_SORT_SETTINGS,
  DEFAULT_DIRECTION,
  DEFAULT_PROPERTY,
  SHOW_UPDATE_SAVED_QUERY_MODAL,
  HIDE_UPDATE_SAVED_QUERY_MODAL,
} from './constants';

export const initialState: ReducerState = {
  autorunQuery: true,
  queriesFilters: {
    showOnlyCachedQueries: false,
    tags: [],
  },
  queriesSortSettings: {
    direction: DEFAULT_DIRECTION,
    property: DEFAULT_PROPERTY,
  },
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
  updateSavedQueryModal: {
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
          chartSettings: action.payload.chartSettings,
          widgetSettings: action.payload.widgetSettings,
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
    case UPDATE_WIDGET_SETTINGS:
      return {
        ...state,
        visualization: {
          ...state.visualization,
          widgetSettings: {
            ...state.visualization.widgetSettings,
            ...action.payload.widgetSettings,
          },
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
    case SET_QUERIES_FILTERS:
      return {
        ...state,
        queriesFilters: {
          ...state.queriesFilters,
          ...action.payload.filters,
        },
      };
    case SET_QUERIES_SORT_SETTINGS:
      return {
        ...state,
        queriesSortSettings: action.payload.sortSettings,
      };
    case SHOW_UPDATE_SAVED_QUERY_MODAL:
      return {
        ...state,
        updateSavedQueryModal: {
          visible: true,
        },
      };
    case HIDE_UPDATE_SAVED_QUERY_MODAL:
      return {
        ...state,
        updateSavedQueryModal: {
          visible: false,
        },
      };
    default:
      return state;
  }
};
