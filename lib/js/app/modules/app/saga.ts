import { takeLatest, put, select } from 'redux-saga/effects';

import { getSavedQuery, updateSaveQuery } from '../savedQuery';

import { updateUI } from '../../redux/actionCreators/ui';

import { b64EncodeUnicode, b64DecodeUnicode } from '../../utils/base64';

import {
  SET_STATE_IN_URL,
  LOAD_STATE_FROM_URL,
  URL_STATE,
  AUTOLOAD_DISABLED,
} from './constants';

export function* loadPersitedState() {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);

  if (searchParams) {
    const persistedState = searchParams.get(URL_STATE);

    if (persistedState) {
      const { userInterface, savedQuery } = JSON.parse(
        b64DecodeUnicode(persistedState)
      );

      userInterface.autoload = !AUTOLOAD_DISABLED.includes(
        userInterface.analysisType
      );

      if (userInterface) yield put(updateUI(userInterface));
      if (savedQuery) yield put(updateSaveQuery(savedQuery));
    }
  }
}

export function* persistState() {
  const state = yield select();
  const userInterface = state.ui;
  const savedQuery = yield select(getSavedQuery);

  const stateToPersist = b64EncodeUnicode(
    JSON.stringify({
      savedQuery,
      userInterface,
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
