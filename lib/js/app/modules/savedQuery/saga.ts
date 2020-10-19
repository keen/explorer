/* eslint-disable @typescript-eslint/camelcase */

import { takeLatest, select, put } from 'redux-saga/effects';

import { updateSaveQuery } from './actions';

import { setVisualization, getQueryAutorun } from '../app';
import { SavedQueryListItem } from '../queries';
import {
  setQuerySettings,
  getSavedQueries,
  runQuery,
  SAVE_QUERY_SUCCESS,
} from '../queries';

import { SELECT_SAVED_QUERY } from './constants';

import { SelectSavedQueryAction } from './types';
import { SaveQuerySuccessAction } from '../queries';
import { SavedQueryAPIResponse } from '../../types';

import { serializeSavedQuery, convertMilisecondsToMinutes } from './utils';

function* selectSavedQuery({ payload }: SelectSavedQueryAction) {
  const savedQueries: SavedQueryListItem[] = yield select(getSavedQueries);

  try {
    const {
      refreshRate,
      cached,
      displayName,
      name,
      tags,
      visualization,
      stepLabels,
      query,
    } = savedQueries.find(({ name: queryName }) => queryName === payload.name);
    const savedQuery = {
      name,
      displayName,
      cached,
      tags,
      refreshRate: convertMilisecondsToMinutes(refreshRate),
      isCloned: false,
      exists: true,
      stepLabels,
    };

    const { type: widgetType, chartSettings, widgetSettings } = visualization;

    yield put(setVisualization(widgetType, chartSettings, widgetSettings));
    yield put(setQuerySettings(query));
    yield put(updateSaveQuery(savedQuery));

    const autorunQuery = yield select(getQueryAutorun);
    if (autorunQuery) {
      yield put(runQuery(query));
    }
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
}

export function* savedQuerySaga() {
  yield takeLatest(SELECT_SAVED_QUERY, selectSavedQuery);
  yield takeLatest(SAVE_QUERY_SUCCESS, saveQuerySuccessHandler);
}
