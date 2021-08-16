import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PickerWidgets } from '@keen.io/widget-picker';

import { ChartSettings } from '../../types';
import {
  Confirmation,
  QueriesFilters,
  QueriesSortSettings,
  ReducerState,
  SettingsModalSource,
  ViewMode,
} from './types';
// import { AppActions } from './actions';

import {
  // APP_START,
  // SHOW_CONFIRMATION,
  // HIDE_CONFIRMATION,
  // ACCEPT_CONFIRMATION,
  // SET_VISUALIZATION,
  // RESET_VISUALIZATION,
  // SET_VIEW_MODE,
  // SET_SCREEN_DIMENSION,
  // SHOW_QUERY_SETTINGS_MODAL,
  // HIDE_QUERY_SETTINGS_MODAL,
  // SHOW_EMBED_MODAL,
  // HIDE_EMBED_MODAL,
  // SHOW_EMAIL_EXTRACTION_MODAL,
  // HIDE_EMAIL_EXTRACTION_MODAL,
  // SET_QUERY_AUTORUN,
  // UPDATE_CHART_SETTINGS,
  // UPDATE_WIDGET_SETTINGS,
  // SET_QUERIES_FILTERS,
  // SET_QUERIES_SORT_SETTINGS,
  DEFAULT_DIRECTION,
  DEFAULT_PROPERTY,
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

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    appStart: (
      state,
      { payload }: PayloadAction<{ initialView: ViewMode }>
    ) => {
      state.view = payload.initialView;
    },
    setScreenDimension: (
      state,
      { payload }: PayloadAction<{ width: number; height: number }>
    ) => {
      state.browserScreen.width = payload.width;
      state.browserScreen.height = payload.height;
    },
    setQueryAutorun: (
      state,
      { payload }: PayloadAction<{ autorun: boolean }>
    ) => {
      state.autorunQuery = payload.autorun;
    },
    showEmailExtractionModal: (state) => {
      state.extractToEmailModal.visible = true;
    },
    hideEmailExtractionModal: (state) => {
      state.extractToEmailModal.visible = false;
    },
    hideQuerySettingsModal: (state) => {
      state.querySettingsModal = initialState.querySettingsModal;
    },
    showQuerySettingsModal: (
      state,
      { payload }: PayloadAction<{ source: SettingsModalSource }>
    ) => {
      state.querySettingsModal = {
        visible: true,
        source: payload.source,
      };
    },
    setViewMode: (state, { payload }: PayloadAction<{ view: ViewMode }>) => {
      state.view = payload.view;
    },
    setVisualization: (
      state,
      {
        payload,
      }: PayloadAction<{
        type: PickerWidgets;
        chartSettings: ChartSettings;
        widgetSettings: Record<string, any>;
      }>
    ) => {
      state.visualization = payload;
    },
    resetVisualization: (state) => {
      state.visualization = initialState.visualization;
    },
    acceptConfirmation: (state) => {
      state.confirmModal = initialState.confirmModal;
    },
    hideConfirmation: (state) => {
      state.confirmModal = initialState.confirmModal;
    },
    showConfirmation: (
      state,
      {
        payload,
      }: PayloadAction<{
        confirmAction: Confirmation;
        meta?: Record<string, any>;
      }>
    ) => {
      state.confirmModal = {
        visible: true,
        action: payload.confirmAction,
        meta: payload.meta,
      };
    },
    showEmbedModal: (state) => {
      state.embedModal.visible = true;
    },
    hideEmbedModal: (state) => {
      state.embedModal.visible = false;
    },
    updateWidgetSettings: (
      state,
      { payload }: PayloadAction<{ widgetSettings: Record<string, any> }>
    ) => {
      state.visualization.widgetSettings = payload.widgetSettings;
    },
    updateChartSettings: (
      state,
      { payload }: PayloadAction<{ chartSettings: Record<string, any> }>
    ) => {
      state.visualization.chartSettings = payload.chartSettings;
    },
    setQueriesFilters: (
      state,
      { payload }: PayloadAction<{ filters: Partial<QueriesFilters> }>
    ) => {
      state.queriesFilters = {
        ...state.queriesFilters,
        ...payload.filters,
      };
    },
    setQueriesSortSettings: (
      state,
      { payload }: PayloadAction<{ sortSettings: QueriesSortSettings }>
    ) => {
      state.queriesSortSettings = payload.sortSettings;
    },
  },
});

export const appReducer = appSlice.reducer;

// export const appReducer = (
//   state: ReducerState = initialState,
//   action: AppActions
// ) => {
//   switch (action.type) {
// case APP_START:
//   return {
//     ...state,
//     view: action.payload.initialView,
//   };
// case SET_SCREEN_DIMENSION:
//   return {
//     ...state,
//     browserScreen: {
//       height: action.payload.height,
//       width: action.payload.width,
//     },
//   };
// case SET_QUERY_AUTORUN:
//   return {
//     ...state,
//     autorunQuery: action.payload.autorun,
//   };
// case SHOW_EMAIL_EXTRACTION_MODAL:
//   return {
//     ...state,
//     extractToEmailModal: {
//       ...state.extractToEmailModal,
//       visible: true,
//     },
//   };
// case HIDE_EMAIL_EXTRACTION_MODAL:
//   return {
//     ...state,
//     extractToEmailModal: {
//       ...state.extractToEmailModal,
//       visible: false,
//     },
//   };
// case HIDE_QUERY_SETTINGS_MODAL:
//   return {
//     ...state,
//     querySettingsModal: {
//       ...state.querySettingsModal,
//       source: null,
//       visible: false,
//     },
//   };
// case SHOW_QUERY_SETTINGS_MODAL:
//   return {
//     ...state,
//     querySettingsModal: {
//       ...state.querySettingsModal,
//       source: action.payload.source,
//       visible: true,
//     },
//   };
// case SET_VIEW_MODE:
//   return {
//     ...state,
//     view: action.payload.view,
//   };
// case SET_VISUALIZATION:
//   return {
//     ...state,
//     visualization: {
//       ...state.visualization,
//       type: action.payload.type,
//       chartSettings: action.payload.chartSettings,
//       widgetSettings: action.payload.widgetSettings,
//     },
//   };
// case RESET_VISUALIZATION:
//   return {
//     ...state,
//     visualization: initialState.visualization,
//   };
// case ACCEPT_CONFIRMATION:
// case HIDE_CONFIRMATION:
//   return {
//     ...state,
//     confirmModal: initialState.confirmModal,
//   };
// case SHOW_CONFIRMATION:
//   return {
//     ...state,
//     confirmModal: {
//       visible: true,
//       meta: action.payload.meta,
//       action: action.payload.confirmAction,
//     },
//   };
// case SHOW_EMBED_MODAL:
//   return {
//     ...state,
//     embedModal: {
//       visible: true,
//     },
//   };
// case HIDE_EMBED_MODAL:
//   return {
//     ...state,
//     embedModal: {
//       visible: false,
//     },
//   };
// case UPDATE_WIDGET_SETTINGS:
//   return {
//     ...state,
//     visualization: {
//       ...state.visualization,
//       widgetSettings: {
//         ...state.visualization.widgetSettings,
//         ...action.payload.widgetSettings,
//       },
//     },
// };
// case UPDATE_CHART_SETTINGS:
//   return {
//     ...state,
//     visualization: {
//       ...state.visualization,
//       chartSettings: {
//         ...state.visualization.chartSettings,
//         ...action.payload.chartSettings,
//       },
//     },
//   };
// case SET_QUERIES_FILTERS:
//   return {
//     ...state,
//     queriesFilters: {
//       ...state.queriesFilters,
//       ...action.payload.filters,
//     }
//   };
// case SET_QUERIES_SORT_SETTINGS:
//   return {
//     ...state,
//     queriesSortSettings: action.payload.sortSettings,
//   };
// default:
//   return state;
// }
// };
