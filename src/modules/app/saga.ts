/* eslint-disable @typescript-eslint/camelcase */
import {
  takeLatest,
  put,
  take,
  select,
  call,
  spawn,
  debounce,
  getContext,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { copyToClipboard } from '@keen.io/charts-utils';

import {
  resizeScreen,
  setScreenDimension,
  resetVisualization,
  setVisualization,
  setViewMode,
  loadPersistedState,
  updateQueryCreator,
  setQueryAutorun,
  updateChartSettings,
  copyEmbeddedCode as copyEmbeddedCodeAction,
  editQuery as editQueryAction,
  downloadCodeSnippet as downloadCodeSnippetAction,
  appStart as appStartAction,
  copyApiResourceUrl as copyApiResourceUrlAction,
  updateVisualizationType as updateVisualizationTypeAction,
  exportChartToImage as exportChartToImageAction,
} from './actions';

import {
  resetSavedQuery,
  updateSavedQuery,
  getSavedQuery,
  selectSavedQuery,
} from '../savedQuery';
import {
  resetQueryResults,
  getQueryResults,
  getSavedQueries,
  fetchSavedQueries,
  getOrganizationUsageLimits,
  getQuerySettings,
  setQuerySettings,
  GET_SAVED_QUERIES_SUCCESS,
} from '../queries';

import { getViewMode, getVisualization } from './selectors';

import {
  getLocationUrl,
  getScreenDimensions,
  b64EncodeUnicode,
  b64DecodeUnicode,
} from './utils';
import {
  exportToImage,
  exportToJson,
  exportToCsv,
  createCodeSnippet,
  exportToHtml,
  createResourceUrl,
} from '../../utils';

import {
  SET_QUERY_EVENT,
  NEW_QUERY_EVENT,
  UPDATE_VISUALIZATION_TYPE,
} from '@keen.io/query-creator';
import { PUBSUB_CONTEXT, NOTIFICATION_MANAGER_CONTEXT } from '../../constants';

import {
  APP_START,
  CREATE_NEW_QUERY,
  CLEAR_QUERY,
  QUERY_EDITOR_MOUNTED,
  SWITCH_TO_QUERIES_LIST,
  EDIT_QUERY,
  NOTIFICATIONS_MOUNTED,
  UPDATE_QUERY_CREATOR,
  SHARE_QUERY_URL,
  LOAD_STATE_FROM_URL,
  SELECT_FIRST_QUERY,
  URL_STATE,
  SCREEN_RESIZE,
  EXPORT_CHART_TO_IMAGE,
  EXPORT_CHART_TO_JSON,
  EXPORT_DATA_TO_CSV,
  COPY_EMBEDDED_CODE,
  DOWNLOAD_CODE_SNIPPET,
  COPY_API_RESOURCE_URL,
  SET_QUERY_AUTORUN,
  QUERY_AUTORUN_KEY,
  UPDATE_VISUALIZATION,
} from './constants';
import { SET_CHART_SETTINGS } from '@keen.io/query-creator';

const createScreenResizeChannel = () =>
  eventChannel((emitter) => {
    const resizeHandler = () => {
      emitter(getScreenDimensions());
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  });

export function* createNewQuery() {
  yield put(setViewMode('editor'));
  const pubsub = yield getContext(PUBSUB_CONTEXT);
  yield pubsub.publish(NEW_QUERY_EVENT);

  yield put(resetQueryResults());
  yield put(resetVisualization());
  yield put(resetSavedQuery());
}

export function* clearQuery() {
  const pubsub = yield getContext(PUBSUB_CONTEXT);
  yield pubsub.publish(NEW_QUERY_EVENT);
  yield put(resetQueryResults());
}

function* editQuery({ payload }: ReturnType<typeof editQueryAction>) {
  yield put(setViewMode('editor'));
  yield take(QUERY_EDITOR_MOUNTED);

  const savedQueries = yield select(getSavedQueries);
  const { query, visualization } = savedQueries.find(
    ({ name }) => name === payload.queryName
  );
  const { chartSettings } = visualization;
  if (chartSettings?.stepLabels && chartSettings.stepLabels.length) {
    const { stepLabels } = chartSettings;
    const pubsub = yield getContext(PUBSUB_CONTEXT);
    yield pubsub.publish(SET_CHART_SETTINGS, { chartSettings: { stepLabels } });
    yield put(updateChartSettings(chartSettings));
  }

  yield put(updateQueryCreator(query));
}

export function* updateCreator({
  payload,
}: ReturnType<typeof updateQueryCreator>) {
  const { query } = payload;
  const pubsub = yield getContext(PUBSUB_CONTEXT);

  yield pubsub.publish(SET_QUERY_EVENT, { query });
}

export function* selectFirstSavedQuery() {
  const savedQueries = yield select(getSavedQueries);

  if (savedQueries.length) {
    const [firstQuery] = savedQueries;
    const { name, query } = firstQuery;
    yield put(selectSavedQuery(name));
    yield put(setQuerySettings(query));
  }
}

export function* switchToQueriesList() {
  yield put(setViewMode('browser'));
  yield put(resetQueryResults());

  const { exists } = yield select(getSavedQuery);
  if (!exists) {
    yield selectFirstSavedQuery();
  }
}

export function* loadStateFromUrl() {
  try {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);

    const persistedState = searchParams.get(URL_STATE);
    const { query, savedQuery, visualization } = JSON.parse(
      b64DecodeUnicode(persistedState)
    );

    if (savedQuery) yield put(updateSavedQuery(savedQuery));
    if (visualization) {
      const { type: widgetType, chartSettings, widgetSettings } = visualization;
      yield put(setVisualization(widgetType, chartSettings, widgetSettings));
    }
    if (query) {
      yield put(setViewMode('editor'));
      yield take(QUERY_EDITOR_MOUNTED);
      yield put(updateQueryCreator(query));
    }
  } catch (err) {
    yield take(NOTIFICATIONS_MOUNTED);
    const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);

    yield notificationManager.showNotification({
      type: 'error',
      message: 'notifications.load_share_query_error',
      showDismissButton: true,
      autoDismiss: false,
    });

    const view = yield select(getViewMode);
    if (view === 'browser') {
      yield take(GET_SAVED_QUERIES_SUCCESS);
      yield selectFirstSavedQuery();
    } else {
      yield put(resetSavedQuery());
    }
  } finally {
    history.replaceState({}, '', getLocationUrl());
  }
}

export function* shareQueryUrl() {
  const savedQuery = yield select(getSavedQuery);
  const query = yield select(getQuerySettings);
  const visualization = yield select(getVisualization);

  try {
    const stateToPersist = yield b64EncodeUnicode(
      JSON.stringify({
        savedQuery,
        visualization,
        query,
      })
    );

    const url = `${getLocationUrl()}?${URL_STATE}=${stateToPersist}`;
    yield copyToClipboard(url);
    const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);

    yield notificationManager.showNotification({
      type: 'success',
      message: 'notifications.share_query_success',
      autoDismiss: true,
    });
  } catch (err) {
    const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);

    yield notificationManager.showNotification({
      type: 'error',
      message: 'notifications.share_query_error',
      showDismissButton: true,
      autoDismiss: false,
    });
  }
}

export function* watchScreenResize() {
  const channel = yield call(createScreenResizeChannel);
  try {
    while (true) {
      const { width, height } = yield take(channel);
      yield put(resizeScreen(width, height));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* resizeBrowserScreen({
  payload,
}: ReturnType<typeof resizeScreen>) {
  const { width, height } = payload;
  yield put(setScreenDimension(width, height));
}

export function* rehydrateAutorunSettings() {
  try {
    const settings = localStorage.getItem(QUERY_AUTORUN_KEY);
    if (settings) {
      const { autorun } = JSON.parse(settings);
      yield put(setQueryAutorun(autorun));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* appStart({ payload }: ReturnType<typeof appStartAction>) {
  yield put(getOrganizationUsageLimits());
  yield put(fetchSavedQueries());

  const { initialView } = payload;

  const locationUrl = new URL(window.location.href);
  const searchParams = new URLSearchParams(locationUrl.search);

  const hasPersistedState = searchParams && searchParams.get(URL_STATE);

  if (hasPersistedState) {
    yield put(loadPersistedState());
  } else if (initialView === 'browser') {
    yield take(GET_SAVED_QUERIES_SUCCESS);
    yield selectFirstSavedQuery();
  }

  const { width, height } = getScreenDimensions();
  yield put(setScreenDimension(width, height));

  yield spawn(rehydrateAutorunSettings);
  yield spawn(watchScreenResize);
}

export function* generateFileName() {
  const savedQuery = yield select(getSavedQuery);
  const query = yield select(getQuerySettings);

  let fileName = 'chart';
  if (savedQuery?.name) {
    fileName = `${savedQuery.name}-${Date.now()}`;
  } else if (query?.analysis_type && query?.event_collection) {
    fileName = `${query.analysis_type}-${query.event_collection}-${Date.now()}`;
  }
  return fileName;
}

export function* exportChartToImage({
  payload,
}: ReturnType<typeof exportChartToImageAction>) {
  const node = document.getElementById('query-visualization');
  if (!node) throw new Error('Query visualization container is not available');
  const fileName = yield generateFileName();

  const { quality, backgroundColor } = payload;

  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);

  try {
    exportToImage({ fileName, node, quality, backgroundColor });
    yield notificationManager.showNotification({
      type: 'info',
      message: 'notifications.image_download_in_progress',
      autoDismiss: true,
    });
  } catch (err) {
    yield notificationManager.showNotification({
      type: 'error',
      message: 'notifications.image_download_error',
      showDismissButton: true,
      autoDismiss: false,
    });
  }
}

export function* exportChartToJson() {
  const data = yield select(getQueryResults);
  const fileName = yield generateFileName();
  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);

  try {
    exportToJson({ data, fileName });
    yield notificationManager.showNotification({
      type: 'info',
      message: 'notifications.json_download_in_progress',
      autoDismiss: true,
    });
  } catch (err) {
    yield notificationManager.showNotification({
      type: 'error',
      message: 'notifications.json_download_error',
      showDismissButton: true,
      autoDismiss: false,
    });
  }
}

export function* exportDataToCsv() {
  const data = yield select(getQueryResults);
  const fileName = yield generateFileName();
  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);

  try {
    exportToCsv({ data, fileName });
    yield notificationManager.showNotification({
      type: 'info',
      message: 'notifications.csv_download_in_progress',
      autoDismiss: true,
    });
  } catch (err) {
    yield notificationManager.showNotification({
      type: 'error',
      message: 'notifications.csv_download_error',
      showDismissButton: true,
      autoDismiss: false,
    });
  }
}

function* getCodeSnippet(projectId: string, readKey: string) {
  const query = yield select(getQuerySettings);
  const { type: widget, chartSettings, widgetSettings } = yield select(
    getVisualization
  );

  const snippet = createCodeSnippet({
    widget,
    query,
    chartSettings,
    widgetSettings,
    projectId,
    readKey,
  });

  return snippet;
}

export function* copyEmbeddedCode({
  payload,
}: ReturnType<typeof copyEmbeddedCodeAction>) {
  const { projectId, readKey } = payload;
  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);

  try {
    const snippet = yield getCodeSnippet(projectId, readKey);
    copyToClipboard(snippet);
    yield notificationManager.showNotification({
      type: 'success',
      message: 'notifications.copy_embedded_code_success',
      autoDismiss: true,
    });
  } catch (err) {
    yield notificationManager.showNotification({
      type: 'error',
      message: 'notifications.copy_embedded_code_error',
      showDismissButton: true,
      autoDismiss: false,
    });
  }
}

export function* downloadCodeSnippet({
  payload,
}: ReturnType<typeof downloadCodeSnippetAction>) {
  const { projectId, readKey } = payload;
  const fileName = yield generateFileName();
  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);

  try {
    const data = yield getCodeSnippet(projectId, readKey);
    exportToHtml({ data, fileName });

    yield notificationManager.showNotification({
      type: 'success',
      message: 'notifications.html_download_in_progress',
      autoDismiss: true,
    });
  } catch (err) {
    yield notificationManager.showNotification({
      type: 'error',
      message: 'notifications.html_download_error',
      showDismissButton: true,
      autoDismiss: false,
    });
  }
}

export function* copyApiResourceUrl({
  payload,
}: ReturnType<typeof copyApiResourceUrlAction>) {
  const { config } = payload;
  const query = yield select(getQuerySettings);
  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
  try {
    const url = createResourceUrl({ query, config });
    yield copyToClipboard(url);
    yield notificationManager.showNotification({
      type: 'success',
      message: 'notifications.copy_api_resource_url',
      autoDismiss: true,
    });
  } catch (err) {
    yield notificationManager.showNotification({
      type: 'error',
      message: 'notifications.copy_api_resource_url_error',
      showDismissButton: true,
      autoDismiss: false,
    });
  }
}

export function* persistAutorunSettings({
  payload,
}: ReturnType<typeof setQueryAutorun>) {
  const { autorun } = payload;
  try {
    localStorage.setItem(QUERY_AUTORUN_KEY, JSON.stringify({ autorun }));
  } catch (err) {
    console.error(err);
  }
}

export function* updateVisualizationType({
  payload,
}: ReturnType<typeof updateVisualizationTypeAction>) {
  const { type } = payload;
  const pubsub = yield getContext(PUBSUB_CONTEXT);
  yield pubsub.publish(UPDATE_VISUALIZATION_TYPE, { type });
}

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
  yield debounce(200, SCREEN_RESIZE, resizeBrowserScreen);
}
