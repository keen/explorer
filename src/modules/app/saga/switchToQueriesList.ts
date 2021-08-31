import { put, select, call } from 'redux-saga/effects';
import { queriesActions } from '../../queries';
import { savedQuerySelectors } from '../../savedQuery';
import { selectFirstSavedQuery } from './selectFirstSavedQuery';
import { appActions } from '../index';

export function* switchToQueriesList() {
  yield put(appActions.setViewMode({ view: 'browser' }));
  yield put(queriesActions.resetQueryResults());

  const { exists } = yield select(savedQuerySelectors.getSavedQuery);
  if (!exists) {
    yield call(selectFirstSavedQuery);
  }
}
