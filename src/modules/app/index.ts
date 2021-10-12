import { appSaga } from './appSaga';
import { appReducer, appSlice } from './reducer';
import { setInitialView } from './utils';

import {
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
  copyEmbeddedCode,
  downloadCodeSnippet,
  copyApiResourceUrl,
  updateChartSettings,
  updateWidgetSettings,
  updateVisualizationType,
  composeSavedQuery,
  validateDashboardsConnections,
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

import { DEFAULT_DIRECTION, DEFAULT_PROPERTY } from './constants';

const appActions = {
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
  copyEmbeddedCode,
  downloadCodeSnippet,
  copyApiResourceUrl,
  updateChartSettings,
  updateWidgetSettings,
  updateVisualizationType,
  composeSavedQuery,
  validateDashboardsConnections,
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

export {
  appReducer,
  appSlice,
  appSaga,
  appActions,
  appSelectors,
  setInitialView,
};

export * from './types';

export { DEFAULT_DIRECTION, DEFAULT_PROPERTY };
