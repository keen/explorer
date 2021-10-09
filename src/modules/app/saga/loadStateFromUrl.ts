import { getContext, put, select, take, call } from 'redux-saga/effects';
import { NOTIFICATION_MANAGER_CONTEXT } from '../../../constants';
import { savedQueryActions } from '../../savedQuery';
import { queriesActions } from '../../queries';
import { URL_STATE } from '../constants';
import { b64DecodeUnicode, getLocationUrl } from '../utils';
import { updateQueryCreator } from '../actions';
import { getViewMode } from '../selectors';
import { appActions } from '../index';
import { selectFirstSavedQuery } from './selectFirstSavedQuery';

export function* loadStateFromUrl() {
  try {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);

    const persistedState = searchParams.get(URL_STATE);
    const { query, savedQuery, visualization } = JSON.parse(
      b64DecodeUnicode(persistedState)
    );

    if (savedQuery) yield put(savedQueryActions.updateSavedQuery(savedQuery));
    if (visualization) {
      const { type: widgetType, chartSettings, widgetSettings } = visualization;
      yield put(
        appActions.setVisualization({
          type: widgetType,
          chartSettings,
          widgetSettings,
        })
      );
    }
    if (query) {
      yield put(appActions.setViewMode({ view: 'editor' }));
      yield take(appActions.queryEditorMounted.type);
      yield put(updateQueryCreator(query));
    }
  } catch (err) {
    yield take(appActions.notificationsMounted.type);
    const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);

    yield notificationManager.showNotification({
      type: 'error',
      message: 'notifications.load_share_query_error',
      showDismissButton: true,
      autoDismiss: false,
    });

    const view = yield select(getViewMode);
    if (view === 'browser') {
      yield take(queriesActions.getSavedQueriesSuccess.type);
      yield call(selectFirstSavedQuery);
    } else {
      yield put(savedQueryActions.resetSavedQuery());
    }
  } finally {
    history.replaceState({}, '', getLocationUrl());
  }
}
