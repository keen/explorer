import {
  PickerWidgets,
  ChartSettings,
  WidgetSettings,
} from '@keen.io/widget-picker';

import {
  showConfirmation,
  hideConfirmation,
  acceptConfirmation,
  setVisualization,
  loadPersistedState,
  setViewMode,
  updateQueryCreator,
  queryEditorMounted,
  notificationsMounted,
  explorerMounted,
  showQuerySettingsModal,
  hideQuerySettingsModal,
  showEmbedModal,
  hideEmbedModal,
  createNewQuery,
  switchToQueriesList,
  clearQuery,
  editQuery,
  shareQueryUrl,
  selectFirstSavedQuery,
  appStart,
  copyEmbeddedCode,
  downloadCodeSnippet,
  showEmailExtractionModal,
  hideEmailExtractionModal,
  copyApiResourceUrl,
  setQueryAutorun,
  updateChartSettings,
  updateVisualizationType,
  resetVisualization,
  resizeScreen,
  setScreenDimension,
} from './actions';

export type Confirmation = 'delete';

export type ViewMode = 'browser' | 'editor';

export enum SettingsModalSource {
  QUERY_SETTINGS,
  FIRST_QUERY_SAVE,
}

export type ReducerState = {
  confirmModal: {
    action: Confirmation;
    visible: boolean;
    meta?: Record<string, any>;
  };
  extractToEmailModal: {
    visible: boolean;
  };
  querySettingsModal: {
    visible: boolean;
    source: SettingsModalSource;
  };
  embedModal: {
    visible: boolean;
  };
  view: ViewMode;
  browserScreen: {
    width: number;
    height: number;
  };
  visualization: {
    type: PickerWidgets | null;
    chartSettings: ChartSettings;
    widgetSettings: WidgetSettings;
  };
  autorunQuery: boolean;
};

export type AppActions =
  | ReturnType<typeof appStart>
  | ReturnType<typeof resizeScreen>
  | ReturnType<typeof setScreenDimension>
  | ReturnType<typeof shareQueryUrl>
  | ReturnType<typeof editQuery>
  | ReturnType<typeof queryEditorMounted>
  | ReturnType<typeof notificationsMounted>
  | ReturnType<typeof explorerMounted>
  | ReturnType<typeof clearQuery>
  | ReturnType<typeof createNewQuery>
  | ReturnType<typeof updateQueryCreator>
  | ReturnType<typeof setViewMode>
  | ReturnType<typeof loadPersistedState>
  | ReturnType<typeof showConfirmation>
  | ReturnType<typeof hideConfirmation>
  | ReturnType<typeof acceptConfirmation>
  | ReturnType<typeof switchToQueriesList>
  | ReturnType<typeof setVisualization>
  | ReturnType<typeof resetVisualization>
  | ReturnType<typeof showQuerySettingsModal>
  | ReturnType<typeof hideQuerySettingsModal>
  | ReturnType<typeof showEmbedModal>
  | ReturnType<typeof hideEmbedModal>
  | ReturnType<typeof copyEmbeddedCode>
  | ReturnType<typeof downloadCodeSnippet>
  | ReturnType<typeof selectFirstSavedQuery>
  | ReturnType<typeof selectFirstSavedQuery>
  | ReturnType<typeof showEmailExtractionModal>
  | ReturnType<typeof hideEmailExtractionModal>
  | ReturnType<typeof setQueryAutorun>
  | ReturnType<typeof updateChartSettings>
  | ReturnType<typeof updateVisualizationType>
  | ReturnType<typeof copyApiResourceUrl>;
