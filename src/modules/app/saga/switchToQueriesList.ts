import { put, select } from 'redux-saga/effects';
import { setViewMode } from '../actions';
import { queriesActions } from '../../queries';
import { savedQuerySelectors } from '../../savedQuery';
import { selectFirstSavedQuery } from './selectFirstSavedQuery';

export function* switchToQueriesList() {
  yield put(setViewMode('browser'));
  yield put(queriesActions.resetQueryResults());

  const { exists } = yield select(savedQuerySelectors.getSavedQuery);
  if (!exists) {
    yield selectFirstSavedQuery();
  }
}
