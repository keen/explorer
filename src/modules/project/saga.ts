import { takeLatest, put } from 'redux-saga/effects';

import { updateTagsPool } from './actions';

import { getSavedQueriesSuccess, GET_SAVED_QUERIES_SUCCESS } from '../queries';

export function* updateTags({
  payload: { queries },
}: ReturnType<typeof getSavedQueriesSuccess>) {
  const tagsPool = new Set<string>();
  yield queries.forEach(({ tags }) =>
    tags.forEach((tag: string) => tagsPool.add(tag))
  );
  yield put(updateTagsPool(Array.from(tagsPool)));
}

export function* projectSaga() {
  yield takeLatest(GET_SAVED_QUERIES_SUCCESS, updateTags);
}
