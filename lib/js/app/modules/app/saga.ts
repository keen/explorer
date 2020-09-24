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
  setViewMode,
  loadPersitedState,
  updateQueryCreator,
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

import { getViewMode } from './selectors';

import text from './text.json';
import {
  getLocationUrl,
  getScreenDimensions,
  b64EncodeUnicode,
  b64DecodeUnicode,
} from './utils';
import { copyToClipboard, exportToImage, exportToJson } from '../../utils';

import { SET_QUERY_EVENT, NEW_QUERY_EVENT } from '../../queryCreator';
import { PUBSUB_CONTEXT, NOTIFICATION_MANAGER_CONTEXT } from '../../constants';

import {
  EditQueryAction,
  ResizeScreenAction,
  UpdateQueryCreatorAction,
  AppStartAction,
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
    const { query, savedQuery } = JSON.parse(b64DecodeUnicode(persistedState));

    if (savedQuery) yield put(updateSaveQuery(savedQuery));
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
      message: text.shareQueryLoadError,
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

  try {
    const stateToPersist = yield b64EncodeUnicode(
      JSON.stringify({
        savedQuery,
        query,
      })
    );

    const url = `${getLocationUrl()}?${URL_STATE}=${stateToPersist}`;
    yield copyToClipboard(url);

    const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
    yield notificationManager.showNotification({
      type: 'success',
      message: text.shareQuerySuccess,
      autoDismiss: true,
    });
  } catch (err) {
    const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
    yield notificationManager.showNotification({
      type: 'error',
      message: text.shareQueryError,
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

  try {
    exportToImage({ fileName, node });
  } catch (err) {
    const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
    yield notificationManager.showNotification({
      type: 'error',
      message: `Image ${text.exportChartError}`,
      showDismissButton: true,
      autoDismiss: false,
    });
  }
}

export function* exportChartToJson() {
  const data = yield select(getQueryResults);
  const fileName = yield generateFileName();

  try {
    exportToJson({ data, fileName });
  } catch (err) {
    const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
    yield notificationManager.showNotification({
      type: 'error',
      message: `JSON ${text.exportChartError}`,
      showDismissButton: true,
      autoDismiss: false,
    });
  }
}

export function* appSaga() {
  yield takeLatest(APP_START, appStart);
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
  yield debounce(200, SCREEN_RESIZE, resizeBrowserScreen);
}
