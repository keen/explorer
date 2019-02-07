import { all, put, call, takeLatest, takeEvery } from 'redux-saga/effects'

import client from '../client';
import KeenExplorer from '../../app';

function* fetchProject() {
  try {
    console.log('fetch proj');
      const responseBody = yield fetch('https://api.keen.io/3.0/projects/5bcd9af0c9e77c0001d0df2f?api_key=DEE5CFC26F34AE709E697A085A2F663430A2E40269ADA9967EF4595AD5DA08E5&')
        .then(response => response.json());
      yield put({
        type: 'PROJECT_FETCH_SUCCESS',
        payload: responseBody
      });
  } catch (e) {
      yield put({
        type: 'PROJECT_FETCH_ERROR',
        payload: e
      });
      return;
  }
};

function* query({ payload }) {
  console.log(KeenExplorer);
  try {
    console.log('queryx', payload);
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
  yield takeLatest('PROJECT_FETCH', fetchProject);
  yield takeLatest('CLIENT_RUN_QUERY', query);
}

export default function* rootSaga() {
  yield all([
    watchFetchProject()
  ])
}
