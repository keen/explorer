import { all, put, call, takeLatest, takeEvery } from 'redux-saga/effects'

import { client } from '../../app';

function* fetchProject() {
  try {
    const url = client.url('/3.0/projects/{projectId}',
      { api_key: client.config.masterKey });
    const responseBody = yield fetch(url)
        .then(response => response.json());
      yield put({
        type: 'CLIENT_FETCH_PROJECT_SUCCESS',
        payload: responseBody
      });
  } catch (e) {
      yield put({
        type: 'CLIENT_FETCH_PROJECT_ERROR',
        payload: e
      });
      return;
  }
};

function* fetchSchema({ payload }) {
  if (!payload.collection) return;
  try {
    const url = client.url(`/3.0/projects/{projectId}/events/${payload.collection}`,
      { api_key: client.config.masterKey });
    const responseBody = yield fetch(url)
        .then(response => response.json());
      yield put({
        type: 'CLIENT_FETCH_SCHEMA_SUCCESS',
        payload: responseBody
      });
  } catch (e) {
      yield put({
        type: 'CLIENT_FETCH_SCHEMA_ERROR',
        payload: e
      });
      return;
  }
};

function* query({ payload }) {
  try {
      const responseBody = yield client.query(payload);
      yield put({
        type: 'CLIENT_RUN_QUERY_SUCCESS',
        payload: responseBody
      });
  } catch (e) {
      yield put({
        type: 'CLIENT_RUN_QUERY_ERROR',
        payload: e
      });
      return;
  }
};

export function* watchFetchProject() {
  yield takeLatest('CLIENT_FETCH_PROJECT', fetchProject);
  yield takeLatest('CLIENT_FETCH_SCHEMA', fetchSchema);
  yield takeLatest('CLIENT_RUN_QUERY', query);
}

export default function* rootSaga() {
  yield all([
    watchFetchProject()
  ])
}
