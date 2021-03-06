/* eslint-disable @typescript-eslint/camelcase */

import { select, put, call } from 'redux-saga/effects';

import { setVisualization } from '../../app';
import { SavedQueryListItem } from '../../queries';
import { queriesActions, getSavedQueries } from '../../queries';
import { convertMilisecondsToMinutes } from '../utils';
import { isQueryEditable } from './isQueryEditable';
import { savedQueryActions } from '../index';

export function* selectSavedQuery({
  payload,
}: ReturnType<typeof savedQueryActions.selectSavedQuery>) {
  yield put(savedQueryActions.setQueryLoading(true));
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

    const isEditable = yield call(isQueryEditable, query);
    yield put(savedQueryActions.setQueryEditable(isEditable));
    yield put(setVisualization(widgetType, chartSettings, widgetSettings));
    yield put(queriesActions.setQuerySettings({ settings: query }));
    yield put(savedQueryActions.updateSavedQuery(savedQuery));

    if (isEditable) {
      const { autorunQuery } = payload;
      if (autorunQuery) {
        yield put(queriesActions.runQuery({ query }));
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    yield put(savedQueryActions.setQueryLoading(false));
  }
}
