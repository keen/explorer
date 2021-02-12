/* eslint-disable @typescript-eslint/camelcase */

import { takeLatest, getContext, select, take, put } from 'redux-saga/effects';
import HttpStatus from 'http-status-codes';
import { transformToQuery } from '@keen.io/query-creator';

import {
  runQueryError,
  runQuerySuccess,
  saveQuerySuccess,
  saveQueryError,
  getSavedQueriesSuccess,
  getSavedQueriesError,
  deleteQuerySuccess,
  deleteQueryError,
  setCacheQueryLimit,
  setCacheQueryLimitExceed,
  setQueryCacheLimitError,
  setQueryLimitReached,
  setQuerySaveState,
  resetQueryResults,
  setQuerySettings,
  runQuery as runQueryAction,
  saveQuery as saveQueryAction,
  deleteQuery as deleteQueryAction,
} from './actions';

import { getQuerySettings, getSavedQueries } from './selectors';

import {
  showConfirmation,
  hideQuerySettingsModal,
  showEmailExtractionModal,
  hideEmailExtractionModal,
  getQuerySettingsModalVisibility,
  getViewMode,
  setViewMode,
  selectFirstSavedQuery,
  switchToQueriesList,
  updateQueryCreator,
  HIDE_CONFIRMATION,
  ACCEPT_CONFIRMATION,
  HIDE_EMAIL_EXTRACTION_MODAL,
  QUERY_EDITOR_MOUNTED,
} from '../../modules/app';

import { getSavedQuery, updateSavedQuery } from '../../modules/savedQuery';

import { serializeSavedQuery } from './utils';

import { SavedQueryAPIResponse } from '../../types';

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
  EXTRACT_TO_EMAIL,
  GET_ORGANIZATION_USAGE_LIMITS,
  RUN_EMAIL_EXTRACTION,
  ERRORS,
  CLONE_SAVED_QUERY,
  CLONED_QUERY_DISPLAY_NAME,
  CLONED_QUERY_NAME,
} from './constants';

import { isElementInViewport } from './utils';

function* scrollToElement(element: HTMLElement) {
  if (element && !isElementInViewport(element)) {
    yield element.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
}

export function* extractToEmail() {
  yield put(showEmailExtractionModal());
  const action = yield take([
    HIDE_EMAIL_EXTRACTION_MODAL,
    RUN_EMAIL_EXTRACTION,
  ]);

  if (action.type === RUN_EMAIL_EXTRACTION) {
    const client = yield getContext(KEEN_CLIENT_CONTEXT);
    const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
    const query = yield select(getQuerySettings);
    try {
      yield put(hideEmailExtractionModal());
      const { latest, email, contentEncoding, contentType } = action.payload;
      const body = {
        ...query,
        email,
        latest,
        content_type: contentType,
        content_encoding: contentEncoding,
      };
      yield client.query(body);
      yield notificationManager.showNotification({
        type: 'info',
        message: 'notifications.prepare_email_extraction',
        autoDismiss: true,
      });
    } catch (error) {
      const { status } = error;
      if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
        yield notificationManager.showNotification({
          type: 'error',
          message: 'notifications.email_extraction_error',
          showDismissButton: true,
          autoDismiss: false,
        });
      } else {
        yield notificationManager.showNotification({
          type: 'error',
          message: error.body,
          translateMessage: false,
          autoDismiss: true,
        });
      }
    }
  }
}

export function* runQuery(action: ReturnType<typeof runQueryAction>) {
  try {
    const {
      payload: { body },
    } = action;
    const client = yield getContext(KEEN_CLIENT_CONTEXT);
    const responseBody = yield client.query(body);

    yield put(runQuerySuccess(responseBody));
  } catch (error) {
    const { body, error_code } = error;
    yield put(runQueryError(error));

    if (error_code === ERRORS.TOO_MANY_QUERIES) {
      yield put(setQueryLimitReached(true));
    } else {
      const notificationManager = yield getContext(
        NOTIFICATION_MANAGER_CONTEXT
      );
      yield notificationManager.showNotification({
        type: 'error',
        translateMessage: false,
        message: body,
      });
    }
  } finally {
    const element = document.getElementById('editor');
    if (element) {
      yield scrollToElement(element);
    }
  }
}

export function* saveQuery({ payload }: ReturnType<typeof saveQueryAction>) {
  try {
    const { name, body } = payload;
    const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
    const client = yield getContext(KEEN_CLIENT_CONTEXT);
    const settingsModalVisible = yield select(getQuerySettingsModalVisibility);

    const responseBody = yield client.put({
      url: client.url('queries', 'saved', name),
      apiKey: client.config.masterKey,
      params: body,
    });

    if (settingsModalVisible) {
      yield put(hideQuerySettingsModal());
    }

    yield put(saveQuerySuccess(name, responseBody));
    yield notificationManager.showNotification({
      type: 'success',
      message: 'notifications.save_query_success',
    });
  } catch (error) {
    const { status, error_code: errorCode } = error;
    const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      yield put(hideQuerySettingsModal());
      yield notificationManager.showNotification({
        type: 'error',
        message: 'notifications.save_query_error',
        showDismissButton: true,
        autoDismiss: false,
      });
    } else {
      const settingsModalVisible = yield select(
        getQuerySettingsModalVisibility
      );
      if (settingsModalVisible) {
        yield put(saveQueryError(error));
      } else {
        yield put(setQuerySaveState(false));
        yield notificationManager.showNotification({
          type: 'error',
          message: error.body,
          translateMessage: false,
          autoDismiss: true,
        });
      }
    }

    if (
      errorCode === ERRORS.OVER_LIMIT_ERROR ||
      errorCode === ERRORS.TOO_MANY_CACHED_QUERIES
    ) {
      yield put(setCacheQueryLimitExceed(true));
    }
  }
}

export function* deleteQuery(action: ReturnType<typeof deleteQueryAction>) {
  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);

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

      const view = yield select(getViewMode);
      if (view === 'editor') yield put(setViewMode('browser'));

      yield put(resetQueryResults());
      yield put(deleteQuerySuccess(queryName));
      yield put(selectFirstSavedQuery());

      yield notificationManager.showNotification({
        type: 'info',
        message: 'notifications.query_delete_success',
        autoDismiss: true,
      });
    }
  } catch (error) {
    const { error_code, status } = error;
    if (error_code === ERRORS.RESOURCE_NOT_FOUND) {
      yield put(resetQueryResults());
      yield put(switchToQueriesList());
      yield put(selectFirstSavedQuery());

      yield notificationManager.showNotification({
        type: 'error',
        message: 'notifications.query_already_deleted',
        autoDismiss: true,
      });
    }

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      yield notificationManager.showNotification({
        type: 'error',
        message: 'notifications.query_delete_error',
        showDismissButton: true,
        autoDismiss: false,
      });
    }

    yield put(deleteQueryError(error));
  }
}

function* fetchSavedQueries() {
  try {
    const client = yield getContext(KEEN_CLIENT_CONTEXT);
    const responseBody: SavedQueryAPIResponse[] = yield client
      .get(client.url('queries', 'saved'))
      .auth(client.masterKey())
      .send();

    const savedQueries = responseBody.map(serializeSavedQuery);

    yield put(getSavedQueriesSuccess(savedQueries));
  } catch (error) {
    yield put(getSavedQueriesError(error));
  }
}

export function* checkOrganizationLimits() {
  try {
    const client = yield getContext(KEEN_CLIENT_CONTEXT);
    const url = client.url('/3.0/projects/{projectId}/organization-usage', {
      api_key: client.config.masterKey,
    });

    const responseBody = yield fetch(url).then((response) => response.json());
    if (responseBody) {
      const {
        cached_queries: { limited, limit, current_usage },
      } = responseBody;

      const limitReached = limited && current_usage >= limit;
      const cachedQueriesLimit = limit;

      yield put(setCacheQueryLimitExceed(limitReached));
      yield put(setCacheQueryLimit(cachedQueriesLimit));
    }
  } catch (error) {
    yield put(setQueryCacheLimitError(error));
  }
}

export function* cloneSavedQuery() {
  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
  const querySettings = yield select(getQuerySettings);
  const savedQuery = yield select(getSavedQuery);
  const view = yield select(getViewMode);

  const displayName = `${savedQuery.displayName} ${CLONED_QUERY_DISPLAY_NAME}`;
  const name = `${savedQuery.name}${CLONED_QUERY_NAME}`;
  const refreshRate = 0;

  const clonedSavedQuery = {
    ...savedQuery,
    cached: false,
    exists: false,
    isCloned: true,
    displayName,
    name,
    refreshRate,
  };

  if (view === 'browser') {
    yield put(setViewMode('editor'));
    yield take(QUERY_EDITOR_MOUNTED);
    yield put(updateQueryCreator(querySettings));
    yield put(setQuerySettings(querySettings));
    yield put(updateSavedQuery(clonedSavedQuery));
  }

  if (view === 'editor') {
    yield put(updateSavedQuery(clonedSavedQuery));
  }

  yield notificationManager.showNotification({
    type: 'success',
    message: 'notifications.clone_query_success',
  });

  const savedQueries = yield select(getSavedQueries);
  const { visualization, tags } = savedQueries.find(
    ({ name }) => name === savedQuery.name
  );
  const { analysis_type: analysisType, ...rest } = querySettings;
  const queryToTransform = { analysisType, ...rest };
  const body = {
    query: transformToQuery(queryToTransform),
    metadata: {
      displayName,
      visualization,
      tags,
    },
    refreshRate,
  };

  yield put(saveQueryAction(name, body));
}

export function* queriesSaga() {
  yield takeLatest(EXTRACT_TO_EMAIL, extractToEmail);
  yield takeLatest(RUN_QUERY, runQuery);
  yield takeLatest(DELETE_QUERY, deleteQuery);
  yield takeLatest(SAVE_QUERY, saveQuery);
  yield takeLatest(
    [GET_SAVED_QUERIES, SAVE_QUERY_SUCCESS, DELETE_QUERY_SUCCESS],
    fetchSavedQueries
  );
  yield takeLatest(
    [GET_ORGANIZATION_USAGE_LIMITS, SAVE_QUERY_SUCCESS, DELETE_QUERY_SUCCESS],
    checkOrganizationLimits
  );
  yield takeLatest(CLONE_SAVED_QUERY, cloneSavedQuery);
}
