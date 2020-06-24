import { takeLatest, put, select, getContext } from 'redux-saga/effects';

import { getSavedQuery, updateSaveQuery } from '../savedQuery';

import { b64EncodeUnicode, b64DecodeUnicode } from '../../utils/base64';
import { SET_QUERY_EVENT } from '../../queryCreator';

import { PersistStateAction } from './types';

import { SET_STATE_IN_URL, LOAD_STATE_FROM_URL, URL_STATE } from './constants';

export function* loadPersitedState() {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);

  if (searchParams) {
    const persistedState = searchParams.get(URL_STATE);

    if (persistedState) {
      const { query, savedQuery } = JSON.parse(
        b64DecodeUnicode(persistedState)
      );

      if (query) {
        const pubsub = yield getContext('pubsub');
        pubsub.publish(SET_QUERY_EVENT, { query });
      }
      if (savedQuery) yield put(updateSaveQuery(savedQuery));
    }
  }
}

export function* persistState(action: PersistStateAction) {
  const {
    payload: { state },
  } = action;
  const savedQuery = yield select(getSavedQuery);

  const stateToPersist = b64EncodeUnicode(
    JSON.stringify({
      savedQuery,
      ...state,
    })
  );

  const url = new URL(window.location.href);
  const { search } = url;

  const urlParams = new URLSearchParams(search);
  const previousState = urlParams.get(URL_STATE);

  if (stateToPersist !== previousState) {
    urlParams.set(URL_STATE, stateToPersist);
    url.search = urlParams.toString();

    history.pushState({}, '', url.toString());
  }
}

export function* appSaga() {
  yield takeLatest(SET_STATE_IN_URL, persistState);
  yield takeLatest(LOAD_STATE_FROM_URL, loadPersitedState);
}
