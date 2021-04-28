/* eslint-disable @typescript-eslint/camelcase */

import { takeLatest, select, put } from 'redux-saga/effects';

import {
  updateSavedQuery,
  selectSavedQuery as selectSavedQueryAction,
} from './actions';

import { setVisualization } from '../app';
import { SavedQueryListItem } from '../queries';
import { queriesActions, getSavedQueries } from '../queries';

import { SELECT_SAVED_QUERY } from './constants';

import { SavedQueryAPIResponse } from '../../types';

import { serializeSavedQuery, convertMilisecondsToMinutes } from './utils';

export function* selectSavedQuery({
  payload,
}: ReturnType<typeof selectSavedQueryAction>) {
  const savedQueries: SavedQueryListItem[] = yield select(getSavedQueries);

  try {
    const {
      refreshRate,
      cached,
      displayName,
      name,
      tags,
      visualization,
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
    };

    const { type: widgetType, chartSettings, widgetSettings } = visualization;

    yield put(setVisualization(widgetType, chartSettings, widgetSettings));
    yield put(queriesActions.setQuerySettings({ settings: query }));
    yield put(updateSavedQuery(savedQuery));

    const { autorunQuery } = payload;
    if (autorunQuery) {
      yield put(queriesActions.runQuery({ query }));
    }
  } catch (err) {
    console.error(err);
  }
}

function* saveQuerySuccessHandler(
  action: ReturnType<typeof queriesActions.saveQuerySuccess>
) {
  const {
    payload: { body },
  } = action;
  const savedQuery = serializeSavedQuery(body as SavedQueryAPIResponse);

  yield put(updateSavedQuery(savedQuery));
}

export function* savedQuerySaga() {
  yield takeLatest(SELECT_SAVED_QUERY, selectSavedQuery);
  yield takeLatest(
    queriesActions.saveQuerySuccess.type,
    saveQuerySuccessHandler
  );
}
