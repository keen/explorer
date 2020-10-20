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

import {
  resizeScreen,
  setScreenDimension,
  resetVisualization,
  setVisualization,
  setViewMode,
  loadPersitedState,
  updateQueryCreator,
  setQueryAutorun,
} from './actions';

import {
  resetSavedQuery,
  updateSaveQuery,
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
  copyToClipboard,
  exportToImage,
  exportToJson,
  exportToCsv,
  createCodeSnippet,
  exportToHtml,
  createResourceUrl,
} from '../../utils';

import { SET_QUERY_EVENT, NEW_QUERY_EVENT } from '../../queryCreator';
import {
  PUBSUB_CONTEXT,
  NOTIFICATION_MANAGER_CONTEXT,
  TRANSLATIONS_CONTEXT,
} from '../../constants';

import {
  EditQueryAction,
  ResizeScreenAction,
  UpdateQueryCreatorAction,
  AppStartAction,
  CopyEmbeddedCodeAction,
  DownloadCodeSnippetAction,
  CopyApiResourceUrlAction,
  SetQueryAutorunAction,
} from './types';

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
} from './constants';

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

function* editQuery({ payload }: EditQueryAction) {
  yield put(setViewMode('editor'));
  yield take(QUERY_EDITOR_MOUNTED);

  const savedQueries = yield select(getSavedQueries);
  const { query } = savedQueries.find(({ name }) => name === payload.queryName);
  yield put(updateQueryCreator(query));
}

export function* updateCreator({ payload }: UpdateQueryCreatorAction) {
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

    if (savedQuery) yield put(updateSaveQuery(savedQuery));
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
    const i18n = yield getContext(TRANSLATIONS_CONTEXT);

    yield notificationManager.showNotification({
      type: 'error',
      message: i18n.t('notifications:load_share_query_error'),
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
    const i18n = yield getContext(TRANSLATIONS_CONTEXT);

    yield notificationManager.showNotification({
      type: 'success',
      message: i18n.t('notifications:share_query_success'),
      autoDismiss: true,
    });
  } catch (err) {
    const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
    const i18n = yield getContext(TRANSLATIONS_CONTEXT);

    yield notificationManager.showNotification({
      type: 'error',
      message: i18n.t('notifications:share_query_error'),
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

export function* resizeBrowserScreen({ payload }: ResizeScreenAction) {
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

export function* appStart({ payload }: AppStartAction) {
  yield put(getOrganizationUsageLimits());
  yield put(fetchSavedQueries());

  const { initialView } = payload;

  const locationUrl = new URL(window.location.href);
  const searchParams = new URLSearchParams(locationUrl.search);

  const hasPersistedState = searchParams && searchParams.get(URL_STATE);

  if (hasPersistedState) {
    yield put(loadPersitedState());
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

export function* exportChartToImage() {
  const node = document.getElementById('query-visualization');
  if (!node) throw new Error('Query visualization container is not available');
  const fileName = yield generateFileName();

  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
  const i18n = yield getContext(TRANSLATIONS_CONTEXT);

  try {
    exportToImage({ fileName, node });
    yield notificationManager.showNotification({
      type: 'info',
      message: i18n.t('notifications:image_download_in_progress'),
      autoDismiss: true,
    });
  } catch (err) {
    yield notificationManager.showNotification({
      type: 'error',
      message: i18n.t('notifications:image_download_error'),
      showDismissButton: true,
      autoDismiss: false,
    });
  }
}

export function* exportChartToJson() {
  const data = yield select(getQueryResults);
  const fileName = yield generateFileName();
  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
  const i18n = yield getContext(TRANSLATIONS_CONTEXT);

  try {
    exportToJson({ data, fileName });
    yield notificationManager.showNotification({
      type: 'info',
      message: i18n.t('notifications:json_download_in_progress'),
      autoDismiss: true,
    });
  } catch (err) {
    yield notificationManager.showNotification({
      type: 'error',
      message: i18n.t('notifications:json_download_error'),
      showDismissButton: true,
      autoDismiss: false,
    });
  }
}

export function* exportDataToCsv() {
  const data = yield select(getQueryResults);
  const fileName = yield generateFileName();
  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
  const i18n = yield getContext(TRANSLATIONS_CONTEXT);

  try {
    exportToCsv({ data, fileName });
    yield notificationManager.showNotification({
      type: 'info',
      message: i18n.t('notifications:csv_download_in_progress'),
      autoDismiss: true,
    });
  } catch (err) {
    yield notificationManager.showNotification({
      type: 'error',
      message: i18n.t('notifications:csv_download_error'),
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

export function* copyEmbeddedCode({ payload }: CopyEmbeddedCodeAction) {
  const { projectId, readKey } = payload;
  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
  const i18n = yield getContext(TRANSLATIONS_CONTEXT);

  try {
    const snippet = yield getCodeSnippet(projectId, readKey);
    copyToClipboard(snippet);
    yield notificationManager.showNotification({
      type: 'success',
      message: i18n.t('notifications:copy_embedded_code_success'),
      autoDismiss: true,
    });
  } catch (err) {
    yield notificationManager.showNotification({
      type: 'error',
      message: i18n.t('notifications:copy_embedded_code_error'),
      showDismissButton: true,
      autoDismiss: false,
    });
  }
}

export function* downloadCodeSnippet({ payload }: DownloadCodeSnippetAction) {
  const { projectId, readKey } = payload;
  const fileName = yield generateFileName();
  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
  const i18n = yield getContext(TRANSLATIONS_CONTEXT);

  try {
    const data = yield getCodeSnippet(projectId, readKey);
    exportToHtml({ data, fileName });

    yield notificationManager.showNotification({
      type: 'success',
      message: i18n.t('notifications:html_download_in_progress'),
      autoDismiss: true,
    });
  } catch (err) {
    yield notificationManager.showNotification({
      type: 'error',
      message: i18n.t('notifications:html_download_error'),
      showDismissButton: true,
      autoDismiss: false,
    });
  }
}

export function* copyApiResourceUrl({ payload }: CopyApiResourceUrlAction) {
  const { config } = payload;
  const query = yield select(getQuerySettings);
  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
  try {
    const url = createResourceUrl({ query, config });
    yield copyToClipboard(url);
    yield notificationManager.showNotification({
      type: 'success',
      message: text.copyApiResourceUrl,
      autoDismiss: true,
    });
  } catch (err) {
    yield notificationManager.showNotification({
      type: 'error',
      message: text.copyApiResourceUrlError,
      showDismissButton: true,
      autoDismiss: false,
    });
  }
}

export function* persistAutorunSettings({ payload }: SetQueryAutorunAction) {
  const { autorun } = payload;
  try {
    localStorage.setItem(QUERY_AUTORUN_KEY, JSON.stringify({ autorun }));
  } catch (err) {
    console.error(err);
  }
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
  yield takeLatest(COPY_API_RESOURCE_URL, copyApiResourceUrl);
  yield debounce(200, SCREEN_RESIZE, resizeBrowserScreen);
}
