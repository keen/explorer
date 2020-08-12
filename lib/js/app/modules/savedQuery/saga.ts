/* eslint-disable @typescript-eslint/camelcase */

import { takeLatest, select, put } from 'redux-saga/effects';

import { updateSaveQuery } from './actions';

import { setVisualizationType, hideQuerySettingsModal } from '../app';
import { getSavedQueries, SAVE_QUERY_SUCCESS } from '../queries';

import { SELECT_SAVED_QUERY } from './constants';

import { SelectSavedQueryAction, SavedQueryAPIResponse } from './types';
import { SaveQuerySuccessAction } from '../queries';

import { serializeSavedQuery } from './utils';

function* selectSavedQuery({ payload }: SelectSavedQueryAction) {
  const { name } = payload;

  const savedQueries = yield select(getSavedQueries);

  try {
    const query = savedQueries.find(({ query_name }) => query_name === name);

    const { metadata } = query;

    const widget = metadata && metadata.widget ? metadata.widget : null;
    const savedQuery = serializeSavedQuery(query);

    yield put(setVisualizationType(widget));
    yield put(updateSaveQuery(savedQuery));
  } catch (err) {
    console.error(err);
  }
}

function* saveQuerySuccessHandler(action: SaveQuerySuccessAction) {
  const {
    payload: { body },
  } = action;
  const savedQuery = serializeSavedQuery(body as SavedQueryAPIResponse);

  yield put(updateSaveQuery(savedQuery));
  yield put(hideQuerySettingsModal());
}

export function* savedQuerySaga() {
  yield takeLatest(SELECT_SAVED_QUERY, selectSavedQuery);
  yield takeLatest(SAVE_QUERY_SUCCESS, saveQuerySuccessHandler);
}
