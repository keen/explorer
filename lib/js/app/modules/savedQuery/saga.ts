import { takeLatest, select, getContext, put } from 'redux-saga/effects';

import { updateSaveQuery, saveQuerySuccess } from './actions';
import { convertMilisecondsToMinutes } from './utils';

import { SET_QUERY_EVENT } from '../../queryCreator';
import { setVisualizationType } from '../app';
import { getSavedQueries, SAVE_QUERY_SUCCESS } from '../queries';

import { SELECT_SAVED_QUERY, EDIT_SAVED_QUERY } from './constants';

import { SelectSavedQueryAction, EditSavedQueryAction } from './types';

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

function* editSavedQuery({ payload }: EditSavedQueryAction) {
  const { queryName } = payload;
  const pubsub = yield getContext('pubsub');
  const savedQueries = yield select(getSavedQueries);

  const { query } = savedQueries.find(
    ({ query_name }) => query_name === queryName
  );

  pubsub.publish(SET_QUERY_EVENT, { query });
}

function* saveQuerySuccessHandler() {
  yield put(saveQuerySuccess());
}

export function* savedQuerySaga() {
  yield takeLatest(SELECT_SAVED_QUERY, selectSavedQuery);
  yield takeLatest(EDIT_SAVED_QUERY, editSavedQuery);
  yield takeLatest(SAVE_QUERY_SUCCESS, saveQuerySuccessHandler);
}
