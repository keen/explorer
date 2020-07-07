import { takeLatest, getContext, put } from 'redux-saga/effects';

import {
  runQueryError,
  runQuerySuccess,
  getSavedQueriesSuccess,
  getSavedQueriesError,
} from './actions';
import { RunQueryAction } from './types';

import { RUN_QUERY, GET_SAVED_QUERIES } from './constants';

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
  yield takeLatest(GET_SAVED_QUERIES, fetchSavedQueries);
}
