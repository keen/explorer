/* eslint-disable @typescript-eslint/camelcase */

import { takeLatest, getContext, select, take, put } from 'redux-saga/effects';
import HttpStatus from 'http-status-codes';
import { v4 as uuid } from 'uuid';

import {
  extractToEmail,
  getSavedQueriesError,
  deleteQueryError,
  runExtraction,
  fetchSavedQueries,
  getOrganizationUsageLimits,
  cloneSavedQuery,
  deleteQuery,
} from './actions';

import {
  runQuery,
  saveQuery,
  performExtraction,
  performExtractionToEmail,
} from './saga';

import { queriesSlice } from './reducer';
import { getQuerySettings, getSavedQueries } from './selectors';

import {
  showConfirmation,
  getViewMode,
  setViewMode,
  selectFirstSavedQuery,
  switchToQueriesList,
  updateQueryCreator,
  HIDE_CONFIRMATION,
  ACCEPT_CONFIRMATION,
  QUERY_EDITOR_MOUNTED,
} from '../../modules/app';

import { getSavedQuery, updateSavedQuery } from '../../modules/savedQuery';

import { serializeSavedQuery, composeQuerySettings } from './utils';

import { SavedQueryAPIResponse } from '../../types';

import {
  NOTIFICATION_MANAGER_CONTEXT,
  KEEN_CLIENT_CONTEXT,
} from '../../constants';

import {
  ERRORS,
  CLONED_QUERY_DISPLAY_NAME,
  CLONED_QUERY_NAME,
} from './constants';

export function* deleteQuery22(action: ReturnType<typeof deleteQuery>) {
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

      yield put(queriesSlice.actions.resetQueryResults());
      yield put(queriesSlice.actions.deleteQuerySuccess({ queryName }));
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
      yield put(queriesSlice.actions.resetQueryResults());
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

function* fetchSavedQueriesList() {
  try {
    const client = yield getContext(KEEN_CLIENT_CONTEXT);
    const responseBody: SavedQueryAPIResponse[] = yield client
      .get(client.url('queries', 'saved'))
      .auth(client.masterKey())
      .send();

    const savedQueries = responseBody.map(serializeSavedQuery);

    yield put(
      queriesSlice.actions.getSavedQueriesSuccess({ queries: savedQueries })
    );
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

      yield put(
        queriesSlice.actions.setCacheQueryLimitExceed({ limitReached })
      );
      yield put(
        queriesSlice.actions.setCacheQueryLimit({ limit: cachedQueriesLimit })
      );
    }
  } catch (error) {
    yield put(queriesSlice.actions.setQueryCacheLimitError({ error }));
  }
}

export function* cloneSavedQuery22() {
  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
  const querySettings = yield select(getQuerySettings);
  const savedQuery = yield select(getSavedQuery);
  const view = yield select(getViewMode);

  const displayName = `${savedQuery.displayName} ${CLONED_QUERY_DISPLAY_NAME}`;
  const name = `${savedQuery.name}${CLONED_QUERY_NAME}-${uuid()}`;
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
    yield put(
      queriesSlice.actions.setQuerySettings({ settings: querySettings })
    );
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
    query: composeQuerySettings(queryToTransform),
    metadata: {
      displayName,
      visualization,
      tags,
    },
    refreshRate,
  };

  yield put(queriesSlice.actions.saveQuery({ name, body }));
}

export function* queriesSaga() {
  yield takeLatest(runExtraction.type, performExtraction);
  yield takeLatest(extractToEmail.type, performExtractionToEmail);
  yield takeLatest(queriesSlice.actions.runQuery.type, runQuery);
  yield takeLatest(deleteQuery.type, deleteQuery22);
  yield takeLatest(queriesSlice.actions.saveQuery.type, saveQuery);
  yield takeLatest(
    [
      fetchSavedQueries.type,
      queriesSlice.actions.saveQuerySuccess.type,
      queriesSlice.actions.deleteQuerySuccess.type,
    ],
    fetchSavedQueriesList
  );
  yield takeLatest(
    [
      getOrganizationUsageLimits.type,
      queriesSlice.actions.saveQuerySuccess.type,
      queriesSlice.actions.deleteQuerySuccess.type,
    ],
    checkOrganizationLimits
  );
  yield takeLatest(cloneSavedQuery.type, cloneSavedQuery22);
}
