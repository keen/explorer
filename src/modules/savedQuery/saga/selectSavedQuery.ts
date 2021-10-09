/* eslint-disable @typescript-eslint/camelcase */

import { select, put, call, getContext } from 'redux-saga/effects';

import {
  SavedQueryListItem,
  queriesActions,
  getSavedQueries,
} from '../../queries';
import { appActions } from '../../app';

import { convertMilisecondsToMinutes } from '../utils';
import { isQueryEditable } from './isQueryEditable';
import { savedQueryActions } from '../index';
import { NOTIFICATION_MANAGER_CONTEXT } from '../../../constants';

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
    yield put(
      appActions.setVisualization({
        type: widgetType,
        chartSettings,
        widgetSettings,
      })
    );
    yield put(queriesActions.setQuerySettings({ settings: query }));
    yield put(savedQueryActions.updateSavedQuery(savedQuery));

    if (isEditable) {
      const { autorunQuery } = payload;
      if (autorunQuery) {
        yield put(queriesActions.runQuery({ query }));
      }
    }

    yield put(savedQueryActions.getDashboardsConnection(name));
  } catch (err) {
    const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
    yield notificationManager.showNotification({
      type: 'error',
      message: 'notifications.query_not_exist',
      showDismissButton: false,
      autoDismiss: true,
    });
    console.error(err);
  } finally {
    yield put(savedQueryActions.setQueryLoading(false));
  }
}
