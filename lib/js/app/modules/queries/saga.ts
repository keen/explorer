import { takeLatest, getContext, take, put } from 'redux-saga/effects';

import {
  runQueryError,
  runQuerySuccess,
  getSavedQueriesSuccess,
  getSavedQueriesError,
  deleteQuerySuccess,
  deleteQueryError,
} from './actions';

import {
  showConfirmation,
  HIDE_CONFIRMATION,
  ACCEPT_CONFIRMATION,
} from '../../modules/app';
import { resetSavedQuery } from '../../modules/savedQuery';

import { RunQueryAction, DeleteQueryAction } from './types';

import { RUN_QUERY, DELETE_QUERY, GET_SAVED_QUERIES } from './constants';

function* runQuery(action: RunQueryAction) {
  try {
    const {
      payload: { body },
    } = action;
    const client = yield getContext('keenClient');
    const responseBody = yield client.query(body);

    yield put(runQuerySuccess(responseBody));
  } catch (error) {
    yield put(runQueryError(error));
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

export function* queriesSaga() {
  yield takeLatest(RUN_QUERY, runQuery);
  yield takeLatest(DELETE_QUERY, deleteQuery);
  yield takeLatest(GET_SAVED_QUERIES, fetchSavedQueries);
}
