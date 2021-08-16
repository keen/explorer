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
  loadPersistedState,
  updateQueryCreator,
  updateChartSettings,
  copyEmbeddedCode as copyEmbeddedCodeAction,
  editQuery as editQueryAction,
  downloadCodeSnippet as downloadCodeSnippetAction,
  // appStart as appStartAction,
  copyApiResourceUrl as copyApiResourceUrlAction,
  updateVisualizationType as updateVisualizationTypeAction,
  exportChartToImage as exportChartToImageAction,
  exportChartToJson as exportChartToJsonAction,
  exportDataToCsv as exportDataToCsvAction,
  shareQueryUrl as shareQueryUrlAction,
  createNewQuery as createNewQueryAction,
  switchToQueriesList as switchToQueriesListAction,
  clearQuery as clearQueryAction,
  selectFirstSavedQuery as selectFirstSavedQueryAction,
} from './actions';

import { selectFirstSavedQuery } from './saga';

import {
  getQueryResults,
  getSavedQueries,
  getOrganizationUsageLimits,
  getQuerySettings,
  queriesActions,
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
  QUERY_EDITOR_MOUNTED,
  NOTIFICATIONS_MOUNTED,
  URL_STATE,
  QUERY_AUTORUN_KEY,
} from './constants';
import { SET_CHART_SETTINGS } from '@keen.io/query-creator';
import { savedQueryActions, savedQuerySelectors } from '../savedQuery';
import { appSlice } from './reducer';

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
  yield put(appSlice.actions.setViewMode({ view: 'editor' }));
  const pubsub = yield getContext(PUBSUB_CONTEXT);
  yield pubsub.publish(NEW_QUERY_EVENT);

  yield put(queriesActions.resetQueryResults());
  yield put(appSlice.actions.resetVisualization());
  yield put(savedQueryActions.resetSavedQuery());
}

export function* clearQuery() {
  const pubsub = yield getContext(PUBSUB_CONTEXT);
  yield pubsub.publish(NEW_QUERY_EVENT);
  yield put(queriesActions.resetQueryResults());
}

function* editQuery({ payload }: ReturnType<typeof editQueryAction>) {
  yield put(appSlice.actions.setViewMode({ view: 'editor' }));
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

export function* switchToQueriesList() {
  yield put(appSlice.actions.setViewMode({ view: 'browser' }));
  yield put(queriesActions.resetQueryResults());

  const { exists } = yield select(savedQuerySelectors.getSavedQuery);
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

    if (savedQuery) yield put(savedQueryActions.updateSavedQuery(savedQuery));
    if (visualization) {
      const { type: widgetType, chartSettings, widgetSettings } = visualization;
      yield put(
        appSlice.actions.setVisualization({
          type: widgetType,
          chartSettings,
          widgetSettings,
        })
      );
    }
    if (query) {
      yield put(appSlice.actions.setViewMode({ view: 'editor' }));
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
      yield take(queriesActions.getSavedQueriesSuccess.type);
      yield selectFirstSavedQuery();
    } else {
      yield put(savedQueryActions.resetSavedQuery());
    }
  } finally {
    history.replaceState({}, '', getLocationUrl());
  }
}

export function* shareQueryUrl() {
  const savedQuery = yield select(savedQuerySelectors.getSavedQuery);
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
  yield put(appSlice.actions.setScreenDimension({ width, height }));
}

export function* rehydrateAutorunSettings() {
  try {
    const settings = localStorage.getItem(QUERY_AUTORUN_KEY);
    if (settings) {
      const { autorun } = JSON.parse(settings);
      yield put(appSlice.actions.setQueryAutorun(autorun));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* appStart({
  payload,
}: ReturnType<typeof appSlice.actions.appStart>) {
  yield put(getOrganizationUsageLimits());
  yield put(queriesActions.fetchSavedQueries());

  const { initialView } = payload;

  const locationUrl = new URL(window.location.href);
  const searchParams = new URLSearchParams(locationUrl.search);

  const hasPersistedState = searchParams && searchParams.get(URL_STATE);

  if (hasPersistedState) {
    yield put(loadPersistedState());
  } else if (initialView === 'browser') {
    yield take(queriesActions.getSavedQueriesSuccess.type);
    yield selectFirstSavedQuery();
  }

  const { width, height } = getScreenDimensions();
  yield put(appSlice.actions.setScreenDimension({ width, height }));

  yield spawn(rehydrateAutorunSettings);
  yield spawn(watchScreenResize);
}

export function* generateFileName() {
  const savedQuery = yield select(savedQuerySelectors.getSavedQuery);
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
}: ReturnType<typeof appSlice.actions.setQueryAutorun>) {
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
  yield takeLatest(appSlice.actions.appStart.type, appStart);
  yield takeLatest(
    appSlice.actions.setQueryAutorun.type,
    persistAutorunSettings
  );
  yield takeLatest(shareQueryUrlAction.type, shareQueryUrl);
  yield takeLatest(loadPersistedState.type, loadStateFromUrl);
  yield takeLatest(updateQueryCreator.type, updateCreator);
  yield takeLatest(createNewQueryAction.type, createNewQuery);
  yield takeLatest(switchToQueriesListAction.type, switchToQueriesList);
  yield takeLatest(clearQueryAction.type, clearQuery);
  yield takeLatest(selectFirstSavedQueryAction.type, selectFirstSavedQuery);
  yield takeLatest(editQueryAction.type, editQuery);
  yield takeLatest(exportChartToImageAction.type, exportChartToImage);
  yield takeLatest(exportChartToJsonAction.type, exportChartToJson);
  yield takeLatest(exportDataToCsvAction.type, exportDataToCsv);
  yield takeLatest(copyEmbeddedCodeAction.type, copyEmbeddedCode);
  yield takeLatest(downloadCodeSnippetAction.type, downloadCodeSnippet);
  yield takeLatest(updateVisualizationTypeAction.type, updateVisualizationType);
  yield takeLatest(copyApiResourceUrlAction.type, copyApiResourceUrl);
  yield debounce(200, resizeScreen.type, resizeBrowserScreen);
}
