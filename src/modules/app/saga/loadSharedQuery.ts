import { put, take, getContext } from 'redux-saga/effects';

import { setVisualization, updateQueryCreator } from '../actions';
import { getLocationUrl, b64DecodeUnicode } from '../utils';

import { NOTIFICATION_MANAGER_CONTEXT } from '../../../constants';

import { QUERY_EDITOR_MOUNTED, NOTIFICATIONS_MOUNTED } from '../constants';
import { savedQueryActions } from '../../savedQuery';

/**
 * Flow responsible for loading shared query state to editor
 *
 * @param sharedQueryState - base64 encoded query state
 * @return void
 *
 */
export function* loadSharedQuery(sharedQueryState: string) {
  try {
    const { query, savedQuery, visualization } = JSON.parse(
      b64DecodeUnicode(sharedQueryState)
    );

    if (savedQuery) yield put(savedQueryActions.updateSavedQuery(savedQuery));
    if (visualization) {
      const { type: widgetType, chartSettings, widgetSettings } = visualization;
      yield put(setVisualization(widgetType, chartSettings, widgetSettings));
    }
    if (query) {
      yield take(QUERY_EDITOR_MOUNTED);
      yield put(updateQueryCreator(query));
    }
  } catch (err) {
    yield take(NOTIFICATIONS_MOUNTED);
    const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);

    yield notificationManager.showNotification({
      type: 'error',
      message: 'notifications.load_share_query_error',
      showDismissButton: true,
      autoDismiss: false,
    });

    yield put(savedQueryActions.resetSavedQuery());
  } finally {
    history.replaceState({}, '', getLocationUrl());
  }
}
