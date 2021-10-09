/* eslint-disable @typescript-eslint/camelcase */
import { debounce, takeLatest } from 'redux-saga/effects';

import { appActions } from './index';

import {
  selectFirstSavedQuery,
  updateVisualizationType,
  persistAutorunSettings,
  copyApiResourceUrl,
  copyEmbeddedCode,
  appStart,
  resizeBrowserScreen,
  shareQueryUrl,
  loadStateFromUrl,
  updateCreator,
  editQuery,
  clearQuery,
  createNewQuery,
  downloadCodeSnippet,
  validateDashboardsConnections,
  composeSavedQuery,
  switchToQueriesList,
  changeView,
} from './saga';
import { SCREEN_RESIZE } from './constants';

export function* appSaga() {
  yield takeLatest(appActions.appStart.type, appStart);
  yield takeLatest(appActions.setQueryAutorun.type, persistAutorunSettings);
  yield takeLatest(appActions.shareQueryUrl.type, shareQueryUrl);
  yield takeLatest(appActions.loadPersistedState.type, loadStateFromUrl);
  yield takeLatest(appActions.updateQueryCreator.type, updateCreator);
  yield takeLatest(appActions.createNewQuery.type, createNewQuery);
  yield takeLatest(appActions.switchToQueriesList.type, switchToQueriesList);
  yield takeLatest(appActions.clearQuery.type, clearQuery);
  yield takeLatest(
    appActions.selectFirstSavedQuery.type,
    selectFirstSavedQuery
  );
  yield takeLatest(appActions.editQuery.type, editQuery);
  yield takeLatest(appActions.copyEmbeddedCode.type, copyEmbeddedCode);
  yield takeLatest(appActions.downloadCodeSnippet.type, downloadCodeSnippet);
  yield takeLatest(
    appActions.updateVisualizationType.type,
    updateVisualizationType
  );
  yield takeLatest(appActions.copyApiResourceUrl.type, copyApiResourceUrl);
  yield takeLatest(
    appActions.validateDashboardsConnections.type,
    validateDashboardsConnections
  );
  yield takeLatest(appActions.setViewMode, changeView);
  yield takeLatest(appActions.composeSavedQuery.type, composeSavedQuery);
  yield debounce(200, SCREEN_RESIZE, resizeBrowserScreen);
}
