import { call, put, spawn, take } from 'redux-saga/effects';

import { getOrganizationUsageLimits, queriesActions } from '../../queries';
import { selectSavedQuery } from '../../savedQuery/actions';
import { URL_STATE } from '../constants';
import { appActions } from '../index';
import { getScreenDimensions } from '../utils';
import { selectFirstSavedQuery } from './selectFirstSavedQuery';
import { rehydrateAutorunSettings } from './rehydrateAutorunSettings';
import { watchScreenResize } from './watchScreenResize';
import { loadSharedQuery } from './loadSharedQuery';

export function* appStart({ payload }: ReturnType<typeof appActions.appStart>) {
  yield put(getOrganizationUsageLimits());
  yield put(queriesActions.fetchSavedQueries());

  const { initialView, savedQuery } = payload;

  const locationUrl = new URL(window.location.href);
  const searchParams = new URLSearchParams(locationUrl.search);

  const sharedQuery = searchParams && searchParams.get(URL_STATE);

  if (sharedQuery) {
    yield call(loadSharedQuery, sharedQuery);
  } else if (initialView === 'browser') {
    yield take(queriesActions.getSavedQueriesSuccess.type);
    if (savedQuery) {
      yield put(selectSavedQuery(savedQuery));
    } else {
      yield selectFirstSavedQuery();
    }
  }

  const { width, height } = getScreenDimensions();
  yield put(appActions.setScreenDimension({ width, height }));

  yield spawn(rehydrateAutorunSettings);
  yield spawn(watchScreenResize);
}
