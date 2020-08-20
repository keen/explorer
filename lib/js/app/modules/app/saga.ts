/* eslint-disable @typescript-eslint/camelcase */

import { takeLatest, put, take, select, getContext } from 'redux-saga/effects';

import { setViewMode, updateQueryCreator } from './actions';

import { resetSavedQuery, updateSaveQuery } from '../savedQuery';
import {
  resetQueryResults,
  getSavedQueries,
  getOrganizationUsageLimits,
} from '../queries';

import { b64EncodeUnicode, b64DecodeUnicode } from '../../utils/base64';
import { copyToClipboard } from '../../utils';

import { SET_QUERY_EVENT, NEW_QUERY_EVENT } from '../../queryCreator';

import {
  EditQueryAction,
  CopyShareUrlAction,
  UpdateQueryCreatorAction,
} from './types';

import {
  APP_START,
  CREATE_NEW_QUERY,
  CLEAR_QUERY,
  QUERY_EDITOR_MOUNTED,
  EDIT_QUERY,
  UPDATE_QUERY_CREATOR,
  COPY_SHARE_URL,
  LOAD_STATE_FROM_URL,
  URL_STATE,
} from './constants';

export function* createNewQuery() {
  yield put(setViewMode('editor'));
  const pubsub = yield getContext('pubsub');
  yield pubsub.publish(NEW_QUERY_EVENT);
  yield put(resetQueryResults());
  yield put(resetSavedQuery());
}

export function* clearQuery() {
  const pubsub = yield getContext('pubsub');
  yield pubsub.publish(NEW_QUERY_EVENT);
  yield put(resetQueryResults());
}

function* editQuery({ payload }: EditQueryAction) {
  yield put(setViewMode('editor'));
  yield take(QUERY_EDITOR_MOUNTED);

  const { queryName } = payload;
  const savedQueries = yield select(getSavedQueries);

  const { query } = savedQueries.find(
    ({ query_name }) => query_name === queryName
  );
  yield put(updateQueryCreator(query));
}

export function* updateCreator({ payload }: UpdateQueryCreatorAction) {
  const { query } = payload;
  const pubsub = yield getContext('pubsub');

  yield pubsub.publish(SET_QUERY_EVENT, { query });
}

export function* loadPersitedState() {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);

  if (searchParams) {
    const persistedState = searchParams.get(URL_STATE);

    if (persistedState) {
      const { query, savedQuery } = JSON.parse(
        b64DecodeUnicode(persistedState)
      );

      if (savedQuery) yield put(updateSaveQuery(savedQuery));
      if (query) {
        yield put(setViewMode('editor'));
        yield take(QUERY_EDITOR_MOUNTED);
        yield put(updateQueryCreator(query));
      }

      history.replaceState({}, '', window.location.origin);
    }
  }
}

export function* copyShareUrl({ payload }: CopyShareUrlAction) {
  const { query, savedQuery } = payload;
  const stateToPersist = b64EncodeUnicode(
    JSON.stringify({
      savedQuery,
      query,
    })
  );

  const url = `${window.location.origin}?${URL_STATE}=${stateToPersist}`;
  yield copyToClipboard(url);
}

export function* appStart() {
  yield put(getOrganizationUsageLimits());
}

export function* appSaga() {
  yield takeLatest(APP_START, appStart);
  yield takeLatest(COPY_SHARE_URL, copyShareUrl);
  yield takeLatest(LOAD_STATE_FROM_URL, loadPersitedState);
  yield takeLatest(UPDATE_QUERY_CREATOR, updateCreator);
  yield takeLatest(CREATE_NEW_QUERY, createNewQuery);
  yield takeLatest(CLEAR_QUERY, clearQuery);
  yield takeLatest(EDIT_QUERY, editQuery);
}
