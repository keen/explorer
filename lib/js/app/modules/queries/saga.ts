import { takeLatest, getContext, put } from 'redux-saga/effects';

import { runQueryError, runQuerySuccess } from './actions';
import { RunQueryAction } from './types';

import { RUN_QUERY } from './constants';

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

export function* queriesSaga() {
  yield takeLatest(RUN_QUERY, runQuery);
}
