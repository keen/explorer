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
import { SET_CHART_SETTINGS } from '@keen.io/query-creator';

import {
  resizeScreen,
  setScreenDimension,
  resetVisualization,
  setViewMode,
  updateQueryCreator,
  setQueryAutorun,
  updateChartSettings,
  copyEmbeddedCode as copyEmbeddedCodeAction,
  editQuery as editQueryAction,
  downloadCodeSnippet as downloadCodeSnippetAction,
  appStart as appStartAction,
  copyApiResourceUrl as copyApiResourceUrlAction,
  updateVisualizationType as updateVisualizationTypeAction,
  composeSavedQuery as composeSavedQueryAction,
  showUpdateSavedQueryModal,
} from './actions';

import { changeView, selectFirstSavedQuery, loadSharedQuery } from './saga';

import {
  getSavedQueries,
  getOrganizationUsageLimits,
  getQuerySettings,
  queriesActions,
} from '../queries';

import { getVisualization } from './selectors';

import { getLocationUrl, getScreenDimensions, b64EncodeUnicode } from './utils';
import {
  createCodeSnippet,
  exportToHtml,
  createResourceUrl,
  setVisualization as setVisualizationSettings,
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
  UPDATE_QUERY_CREATOR,
  SHARE_QUERY_URL,
  SELECT_FIRST_QUERY,
  URL_STATE,
  SCREEN_RESIZE,
  COPY_EMBEDDED_CODE,
  DOWNLOAD_CODE_SNIPPET,
  COPY_API_RESOURCE_URL,
  SET_QUERY_AUTORUN,
  QUERY_AUTORUN_KEY,
  UPDATE_VISUALIZATION,
  VALIDATE_DASHBOARDS_CONNECTIONS,
  COMPOSE_SAVED_QUERY,
  SET_VIEW_MODE,
} from './constants';
import { savedQueryActions, savedQuerySelectors } from '../savedQuery';
import { selectSavedQuery } from '../savedQuery/actions';
import { generateFileName } from '../dataExport/saga/generateFileName';

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
  yield put(savedQueryActions.resetSavedQuery());
  yield put(setViewMode('editor'));
  const pubsub = yield getContext(PUBSUB_CONTEXT);
  yield pubsub.publish(NEW_QUERY_EVENT);

  yield put(queriesActions.resetQueryResults());
  yield put(resetVisualization());
}

export function* clearQuery() {
  const pubsub = yield getContext(PUBSUB_CONTEXT);
  yield pubsub.publish(NEW_QUERY_EVENT);
  yield put(queriesActions.resetQueryResults());
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

export function* switchToQueriesList() {
  yield put(setViewMode('browser'));
  yield put(queriesActions.resetQueryResults());

  const { exists } = yield select(savedQuerySelectors.getSavedQuery);
  if (!exists) {
    yield selectFirstSavedQuery();
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
  yield put(queriesActions.fetchSavedQueries());

  const { initialView, savedQuery } = payload;

  const locationUrl = new URL(window.location.href);
  const searchParams = new URLSearchParams(locationUrl.search);

  const sharedQuery = searchParams && searchParams.get(URL_STATE);

  if (sharedQuery) {
    yield call(loadSharedQuery, sharedQuery);
  } else if (initialView === 'browser') {
    yield take(queriesActions.getSavedQueriesSuccess.type);
    if (savedQuery) {
      yield put(selectSavedQuery(savedQuery));
    } else {
      yield selectFirstSavedQuery();
    }
  }

  const { width, height } = getScreenDimensions();
  yield put(setScreenDimension(width, height));

  yield spawn(rehydrateAutorunSettings);
  yield spawn(watchScreenResize);
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

export function* composeSavedQuery({
  payload,
}: ReturnType<typeof composeSavedQueryAction>) {
  const { displayName, refreshRate, tags, name } = payload;

  const query = yield select(getQuerySettings);
  const visualizationFromState = yield select(getVisualization);
  const visualization = setVisualizationSettings(query, visualizationFromState);

  const body = {
    query,
    metadata: {
      displayName,
      visualization,
      tags,
    },
    refreshRate: refreshRate * 60 * 60,
  };

  yield put(queriesActions.saveQuery({ name, body }));
}

export function* validateDashboardsConnections() {
  const { displayName, refreshRate, tags, name } = yield select(
    savedQuerySelectors.getSavedQuery
  );

  yield put(savedQueryActions.getDashboardsConnection(name));
  yield take(savedQueryActions.getDashboardsConnectionDone.type);

  const dashboards = yield select(savedQuerySelectors.getConnectedDashboards);
  const isDashboardConnectionError = yield select(
    savedQuerySelectors.getConnectedDashboardsError
  );

  if (dashboards?.length || isDashboardConnectionError) {
    yield put(showUpdateSavedQueryModal());
  } else {
    yield put(composeSavedQueryAction(displayName, refreshRate, tags, name));
  }
}

export function* appSaga() {
  yield takeLatest(APP_START, appStart);
  yield takeLatest(SET_QUERY_AUTORUN, persistAutorunSettings);
  yield takeLatest(SHARE_QUERY_URL, shareQueryUrl);
  yield takeLatest(UPDATE_QUERY_CREATOR, updateCreator);
  yield takeLatest(CREATE_NEW_QUERY, createNewQuery);
  yield takeLatest(SWITCH_TO_QUERIES_LIST, switchToQueriesList);
  yield takeLatest(CLEAR_QUERY, clearQuery);
  yield takeLatest(SELECT_FIRST_QUERY, selectFirstSavedQuery);
  yield takeLatest(EDIT_QUERY, editQuery);
  yield takeLatest(COPY_EMBEDDED_CODE, copyEmbeddedCode);
  yield takeLatest(DOWNLOAD_CODE_SNIPPET, downloadCodeSnippet);
  yield takeLatest(UPDATE_VISUALIZATION, updateVisualizationType);
  yield takeLatest(COPY_API_RESOURCE_URL, copyApiResourceUrl);
  yield takeLatest(
    VALIDATE_DASHBOARDS_CONNECTIONS,
    validateDashboardsConnections
  );
  yield takeLatest(COMPOSE_SAVED_QUERY, composeSavedQuery);
  yield takeLatest(SET_VIEW_MODE, changeView);
  yield debounce(200, SCREEN_RESIZE, resizeBrowserScreen);
}
