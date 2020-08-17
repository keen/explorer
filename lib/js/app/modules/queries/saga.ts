/* eslint-disable @typescript-eslint/camelcase */

import { takeLatest, getContext, take, put } from 'redux-saga/effects';
import HttpStatus from 'http-status-codes';

import {
  runQueryError,
  runQuerySuccess,
  saveQuerySuccess,
  saveQueryError,
  getSavedQueriesSuccess,
  getSavedQueriesError,
  deleteQuerySuccess,
  deleteQueryError,
  setQueryCacheLimit,
  setQueryCacheLimitError,
} from './actions';

import {
  showConfirmation,
  hideQuerySettingsModal,
  HIDE_CONFIRMATION,
  ACCEPT_CONFIRMATION,
} from '../../modules/app';
import { resetSavedQuery } from '../../modules/savedQuery';
import text from './text.json';

import { RunQueryAction, DeleteQueryAction, SaveQueryAction } from './types';

import {
  NOTIFICATION_MANAGER_CONTEXT,
  KEEN_CLIENT_CONTEXT,
} from '../../constants';

import {
  RUN_QUERY,
  DELETE_QUERY,
  DELETE_QUERY_SUCCESS,
  SAVE_QUERY,
  GET_SAVED_QUERIES,
  SAVE_QUERY_SUCCESS,
  ERRORS,
} from './constants';

function* runQuery(action: RunQueryAction) {
  try {
    const {
      payload: { body },
    } = action;
    const client = yield getContext(KEEN_CLIENT_CONTEXT);
    const responseBody = yield client.query(body);

    yield put(runQuerySuccess(responseBody));
  } catch (error) {
    yield put(runQueryError(error));

    const { body } = error;
    const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
    yield notificationManager.showNotification({
      type: 'error',
      message: body,
    });
  }
}

function* saveQuery({ payload }: SaveQueryAction) {
  try {
    const { name, body } = payload;
    const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
    const client = yield getContext(KEEN_CLIENT_CONTEXT);

    const responseBody = yield client.put({
      url: client.url('queries', 'saved', name),
      apiKey: client.config.masterKey,
      params: body,
    });

    yield put(hideQuerySettingsModal());
    yield put(saveQuerySuccess(name, responseBody));
    yield notificationManager.showNotification({
      type: 'success',
      message: text.saveQuerySuccess,
    });
  } catch (error) {
    const { status, error_code: errorCode } = error;

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      yield put(hideQuerySettingsModal());
      const notificationManager = yield getContext(
        NOTIFICATION_MANAGER_CONTEXT
      );
      yield notificationManager.showNotification({
        type: 'error',
        message: text.saveQueryError,
        showDismissButton: true,
        autoDismiss: false,
      });
    } else {
      yield put(saveQueryError(error));
    }

    if (
      errorCode === ERRORS.OVER_LIMIT_ERROR ||
      errorCode === ERRORS.TOO_MANY_QUERIES
    ) {
      yield put({
        type: 'ABOVE_CACHE_QUERY_LIMIT',
      });
    }
  }
}

function* deleteQuery(action: DeleteQueryAction) {
  try {
    const {
      payload: { queryName },
    } = action;
    yield put(showConfirmation('delete', { queryName }));
    const confirm = yield take([ACCEPT_CONFIRMATION, HIDE_CONFIRMATION]);

    if (confirm.type === ACCEPT_CONFIRMATION) {
      const client = yield getContext('keenClient');
      yield client
        .del(client.url('queries', 'saved', queryName))
        .auth(client.masterKey())
        .send();

      yield put(resetSavedQuery());
      yield put(deleteQuerySuccess(queryName));
    }
  } catch (error) {
    yield put(deleteQueryError(error));
  }
}

function* fetchSavedQueries() {
  try {
    const client = yield getContext('keenClient');
    const responseBody = yield client
      .get(client.url('queries', 'saved'))
      .auth(client.masterKey())
      .send();

    yield put(getSavedQueriesSuccess(responseBody));
  } catch (error) {
    yield put(getSavedQueriesError(error));
  }
}

function* checkCacheLimits() {
  try {
    const client = yield getContext('keenClient');
    const url = client.url('/3.0/projects/{projectId}/organization-usage', {
      api_key: client.config.masterKey,
    });
    const responseBody = yield fetch(url).then((response) => response.json());
    if (responseBody) {
      const {
        cached_queries: { limited, limit, current_usage },
      } = responseBody;

      const limitReached = limited && current_usage >= limit;
      yield put(setQueryCacheLimit(limitReached));
    }
  } catch (error) {
    yield put(setQueryCacheLimitError(error));
  }
}

export function* queriesSaga() {
  yield takeLatest(RUN_QUERY, runQuery);
  yield takeLatest(DELETE_QUERY, deleteQuery);
  yield takeLatest(SAVE_QUERY, saveQuery);
  yield takeLatest(
    [GET_SAVED_QUERIES, SAVE_QUERY_SUCCESS, DELETE_QUERY_SUCCESS],
    fetchSavedQueries
  );
  yield takeLatest(
    [SAVE_QUERY_SUCCESS, DELETE_QUERY_SUCCESS],
    checkCacheLimits
  );
}
