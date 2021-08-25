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

import {
  APP_START,
  CREATE_NEW_QUERY,
  CLEAR_QUERY,
  SWITCH_TO_QUERIES_LIST,
  EDIT_QUERY,
  UPDATE_QUERY_CREATOR,
  SHARE_QUERY_URL,
  LOAD_STATE_FROM_URL,
  SELECT_FIRST_QUERY,
  SCREEN_RESIZE,
  EXPORT_CHART_TO_IMAGE,
  EXPORT_CHART_TO_JSON,
  EXPORT_DATA_TO_CSV,
  COPY_EMBEDDED_CODE,
  DOWNLOAD_CODE_SNIPPET,
  COPY_API_RESOURCE_URL,
  SET_QUERY_AUTORUN,
  UPDATE_VISUALIZATION,
  SAVE_EXISTING_QUERY,
  SAVE_QUERY,
} from './constants';

export function* appSaga() {
  yield takeLatest(APP_START, appStart);
  yield takeLatest(SET_QUERY_AUTORUN, persistAutorunSettings);
  yield takeLatest(SHARE_QUERY_URL, shareQueryUrl);
  yield takeLatest(LOAD_STATE_FROM_URL, loadStateFromUrl);
  yield takeLatest(UPDATE_QUERY_CREATOR, updateCreator);
  yield takeLatest(CREATE_NEW_QUERY, createNewQuery);
  yield takeLatest(SWITCH_TO_QUERIES_LIST, switchToQueriesList);
  yield takeLatest(CLEAR_QUERY, clearQuery);
  yield takeLatest(SELECT_FIRST_QUERY, selectFirstSavedQuery);
  yield takeLatest(EDIT_QUERY, editQuery);
  yield takeLatest(EXPORT_CHART_TO_IMAGE, exportChartToImage);
  yield takeLatest(EXPORT_CHART_TO_JSON, exportChartToJson);
  yield takeLatest(EXPORT_DATA_TO_CSV, exportDataToCsv);
  yield takeLatest(COPY_EMBEDDED_CODE, copyEmbeddedCode);
  yield takeLatest(DOWNLOAD_CODE_SNIPPET, downloadCodeSnippet);
  yield takeLatest(UPDATE_VISUALIZATION, updateVisualizationType);
  yield takeLatest(COPY_API_RESOURCE_URL, copyApiResourceUrl);
  yield takeLatest(SAVE_EXISTING_QUERY, saveExistingQuery);
  yield takeLatest(SAVE_QUERY, saveQuery);
  yield debounce(200, SCREEN_RESIZE, resizeBrowserScreen);
}
