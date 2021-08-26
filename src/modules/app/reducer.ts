import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PickerWidgets } from '@keen.io/widget-picker';

import {
  Confirmation,
  QueriesFilters,
  QueriesSortSettings,
  ReducerState,
  SettingsModalSource,
  ViewMode,
} from './types';

import { DEFAULT_DIRECTION, DEFAULT_PROPERTY } from './constants';

import { ChartSettings } from '../../types';

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
      state.visualization = {
        ...state.visualization,
        type: payload.type,
        chartSettings: payload.chartSettings,
        widgetSettings: payload.widgetSettings,
      };
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
      state.visualization.widgetSettings = {
        ...state.visualization.widgetSettings,
        ...payload.widgetSettings,
      };
    },
    updateChartSettings: (
      state,
      { payload }: PayloadAction<{ chartSettings: Record<string, any> }>
    ) => {
      state.visualization.chartSettings = {
        ...state.visualization.chartSettings,
        ...payload.chartSettings,
      };
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
    showUpdateSavedQueryModal: (state) => {
      state.updateSavedQueryModal.visible = true;
    },
    hideUpdateSavedQueryModal: (state) => {
      state.updateSavedQueryModal.visible = false;
    },
  },
});

export const appReducer = appSlice.reducer;
