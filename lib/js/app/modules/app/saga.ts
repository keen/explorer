/* eslint-disable @typescript-eslint/camelcase */

import { takeLatest, put, take, select, getContext } from 'redux-saga/effects';

import { setViewMode, updateQueryCreator } from './actions';

import {
  resetSavedQuery,
  updateSaveQuery,
  getSavedQuery,
  selectSavedQuery,
} from '../savedQuery';
import {
  resetQueryResults,
  getSavedQueries,
  fetchSavedQueries,
  getOrganizationUsageLimits,
  setQuerySettings,
  GET_SAVED_QUERIES_SUCCESS,
} from '../queries';

import { b64EncodeUnicode, b64DecodeUnicode } from '../../utils/base64';
import { copyToClipboard } from '../../utils';

import { SET_QUERY_EVENT, NEW_QUERY_EVENT } from '../../queryCreator';

import {
  EditQueryAction,
  CopyShareUrlAction,
  UpdateQueryCreatorAction,
  AppStartAction,
} from './types';

import {
  APP_START,
  CREATE_NEW_QUERY,
  CLEAR_QUERY,
  QUERY_EDITOR_MOUNTED,
  SWITCH_TO_QUERIES_LIST,
  EDIT_QUERY,
  UPDATE_QUERY_CREATOR,
  COPY_SHARE_URL,
  LOAD_STATE_FROM_URL,
  SELECT_FIRST_QUERY,
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

  const savedQueries = yield select(getSavedQueries);
  const { query } = savedQueries.find(({ name }) => name === payload.queryName);
  yield put(updateQueryCreator(query));
}

export function* updateCreator({ payload }: UpdateQueryCreatorAction) {
  const { query } = payload;
  const pubsub = yield getContext('pubsub');

  yield pubsub.publish(SET_QUERY_EVENT, { query });
}

export function* selectFirstSavedQuery() {
  const savedQueries = yield select(getSavedQueries);

  if (savedQueries.length) {
    const [firstQuery] = savedQueries;
    const { name, query } = firstQuery;
    yield put(selectSavedQuery(name));
    yield put(setQuerySettings(query));
  }
}

export function* switchToQueriesList() {
  yield put(setViewMode('browser'));
  yield put(resetQueryResults());

  const { exists } = yield select(getSavedQuery);
  if (!exists) {
    yield selectFirstSavedQuery();
  }
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

export function* appStart({ payload }: AppStartAction) {
  yield put(getOrganizationUsageLimits());
  yield put(fetchSavedQueries());

  const { initialView } = payload;
  if (initialView === 'browser') {
    yield take(GET_SAVED_QUERIES_SUCCESS);
    yield selectFirstSavedQuery();
  }
}

export function* appSaga() {
  yield takeLatest(APP_START, appStart);
  yield takeLatest(COPY_SHARE_URL, copyShareUrl);
  yield takeLatest(LOAD_STATE_FROM_URL, loadPersitedState);
  yield takeLatest(UPDATE_QUERY_CREATOR, updateCreator);
  yield takeLatest(CREATE_NEW_QUERY, createNewQuery);
  yield takeLatest(SWITCH_TO_QUERIES_LIST, switchToQueriesList);
  yield takeLatest(CLEAR_QUERY, clearQuery);
  yield takeLatest(SELECT_FIRST_QUERY, selectFirstSavedQuery);
  yield takeLatest(EDIT_QUERY, editQuery);
}
