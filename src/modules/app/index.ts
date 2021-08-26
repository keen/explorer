import { appSaga } from './appSaga';
import { appReducer, appSlice } from './reducer';
import {
  loadPersistedState,
  updateQueryCreator,
  queryEditorMounted,
  notificationsMounted,
  explorerMounted,
  createNewQuery,
  switchToQueriesList,
  clearQuery,
  editQuery,
  shareQueryUrl,
  selectFirstSavedQuery,
  exportChartToImage,
  exportChartToJson,
  exportDataToCsv,
  copyEmbeddedCode,
  downloadCodeSnippet,
  copyApiResourceUrl,
  updateChartSettings,
  updateWidgetSettings,
  updateVisualizationType,
  saveExistingQuery,
  saveQuery,
} from './actions';

import {
  getConfirmation,
  getViewMode,
  getQuerySettingsModalSource,
  getQuerySettingsModalVisibility,
  getEmbedModalVisibility,
  getExtractToEmailModalVisibility,
  getVisualization,
  getBrowserScreenDimension,
  getQueryAutorun,
  getQueriesFilters,
  getQueriesSortSettings,
  getUpdateSavedQueryModalVisibility,
} from './selectors';

import {
  URL_STATE,
  QUERY_AUTORUN_KEY,
  DEFAULT_PROPERTY,
  DEFAULT_DIRECTION,
} from './constants';

const appActions = {
  loadPersistedState,
  updateQueryCreator,
  queryEditorMounted,
  notificationsMounted,
  explorerMounted,
  createNewQuery,
  switchToQueriesList,
  clearQuery,
  editQuery,
  shareQueryUrl,
  selectFirstSavedQuery,
  exportChartToImage,
  exportChartToJson,
  exportDataToCsv,
  copyEmbeddedCode,
  downloadCodeSnippet,
  copyApiResourceUrl,
  updateChartSettings,
  updateWidgetSettings,
  updateVisualizationType,
  saveQuery,
  saveExistingQuery,
  ...appSlice.actions,
};

const appSelectors = {
  getViewMode,
  getConfirmation,
  getBrowserScreenDimension,
  getQuerySettingsModalSource,
  getQuerySettingsModalVisibility,
  getEmbedModalVisibility,
  getVisualization,
  getExtractToEmailModalVisibility,
  getQueryAutorun,
  getQueriesFilters,
  getQueriesSortSettings,
  getUpdateSavedQueryModalVisibility,
};

export { appReducer, appSlice, appSaga, appActions, appSelectors };

export * from './types';

export { URL_STATE, QUERY_AUTORUN_KEY, DEFAULT_PROPERTY, DEFAULT_DIRECTION };
