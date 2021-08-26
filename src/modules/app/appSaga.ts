/* eslint-disable @typescript-eslint/camelcase */
import { takeLatest, debounce } from 'redux-saga/effects';

import {
  selectFirstSavedQuery,
  saveExistingQuery,
  saveQuery,
  updateVisualizationType,
  persistAutorunSettings,
  copyApiResourceUrl,
  copyEmbeddedCode,
  exportDataToCsv,
  exportChartToJson,
  exportChartToImage,
  appStart,
  resizeBrowserScreen,
  shareQueryUrl,
  loadStateFromUrl,
  switchToQueriesList,
  updateCreator,
  editQuery,
  clearQuery,
  createNewQuery,
  downloadCodeSnippet,
} from './saga';

import { SCREEN_RESIZE } from './constants';

import { appActions } from './index';

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
  yield takeLatest(appActions.exportChartToImage.type, exportChartToImage);
  yield takeLatest(appActions.exportChartToJson.type, exportChartToJson);
  yield takeLatest(appActions.exportDataToCsv.type, exportDataToCsv);
  yield takeLatest(appActions.copyEmbeddedCode.type, copyEmbeddedCode);
  yield takeLatest(appActions.downloadCodeSnippet.type, downloadCodeSnippet);
  yield takeLatest(
    appActions.updateVisualizationType.type,
    updateVisualizationType
  );
  yield takeLatest(appActions.copyApiResourceUrl.type, copyApiResourceUrl);
  yield takeLatest(appActions.saveExistingQuery.type, saveExistingQuery);
  yield takeLatest(appActions.saveQuery.type, saveQuery);
  yield debounce(200, SCREEN_RESIZE, resizeBrowserScreen);
}
