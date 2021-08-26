import { put, spawn, take } from 'redux-saga/effects';

import { loadPersistedState } from '../actions';
import { getOrganizationUsageLimits, queriesActions } from '../../queries';
import { URL_STATE } from '../constants';
import { selectFirstSavedQuery } from './selectFirstSavedQuery';
import { getScreenDimensions } from '../utils';
import { appActions } from '../index';
import { rehydrateAutorunSettings } from './resizeBrowserScreen';
import { watchScreenResize } from './watchScreenResize';

export function* appStart({ payload }: ReturnType<typeof appActions.appStart>) {
  yield put(getOrganizationUsageLimits());
  yield put(queriesActions.fetchSavedQueries());

  const { initialView } = payload;

  const locationUrl = new URL(window.location.href);
  const searchParams = new URLSearchParams(locationUrl.search);

  const hasPersistedState = searchParams && searchParams.get(URL_STATE);

  if (hasPersistedState) {
    yield put(loadPersistedState());
  } else if (initialView === 'browser') {
    yield take(queriesActions.getSavedQueriesSuccess.type);
    yield selectFirstSavedQuery();
  }

  const { width, height } = getScreenDimensions();
  yield put(appActions.setScreenDimension({ width, height }));

  yield spawn(rehydrateAutorunSettings);
  yield spawn(watchScreenResize);
}
