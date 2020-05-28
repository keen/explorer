import { takeLatest, select, put } from 'redux-saga/effects';

import { updateSaveQuery } from './actions';
import { convertMilisecondsToMinutes } from './utils';

import { SELECT_SAVED_QUERY } from './constants';

import { getSavedQueries } from '../queries';

import { SelectSavedQueryAction } from './types';

function* selectSavedQuery({ payload }: SelectSavedQueryAction) {
  const { name } = payload;
  const savedQueries = yield select(getSavedQueries);

  try {
    const { query_name, refresh_rate, metadata } = savedQueries.find(
      ({ query_name }) => query_name === name
    );
    const savedQuery = {
      name,
      displayName: metadata ? metadata.display_name : query_name,
      cached: !!refresh_rate,
      refreshRate: convertMilisecondsToMinutes(refresh_rate),
      exists: true,
    };

    yield put(updateSaveQuery(savedQuery));
  } catch (err) {
    console.error(err);
  }
}

export function* savedQuerySaga() {
  yield takeLatest(SELECT_SAVED_QUERY, selectSavedQuery);
}
