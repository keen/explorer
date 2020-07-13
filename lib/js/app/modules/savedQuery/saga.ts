import { takeLatest, select, put } from 'redux-saga/effects';

import { updateSaveQuery, saveQuerySuccess } from './actions';
import { convertMilisecondsToMinutes } from './utils';

import { setVisualizationType } from '../app';
import { getSavedQueries, SAVE_QUERY_SUCCESS } from '../queries';

import { SELECT_SAVED_QUERY } from './constants';

import { SelectSavedQueryAction } from './types';

function* selectSavedQuery({ payload }: SelectSavedQueryAction) {
  const { name } = payload;

  const savedQueries = yield select(getSavedQueries);

  try {
    const { query_name, refresh_rate, metadata } = savedQueries.find(
      ({ query_name }) => query_name === name
    );

    const widget = metadata && metadata.widget ? metadata.widget : null;
    const savedQuery = {
      name,
      displayName: metadata ? metadata.display_name : query_name,
      cached: !!refresh_rate,
      refreshRate: convertMilisecondsToMinutes(refresh_rate),
      exists: true,
    };

    yield put(setVisualizationType(widget));
    yield put(updateSaveQuery(savedQuery));
  } catch (err) {
    console.error(err);
  }
}

function* saveQuerySuccessHandler() {
  yield put(saveQuerySuccess());
}

export function* savedQuerySaga() {
  yield takeLatest(SELECT_SAVED_QUERY, selectSavedQuery);
  yield takeLatest(SAVE_QUERY_SUCCESS, saveQuerySuccessHandler);
}
