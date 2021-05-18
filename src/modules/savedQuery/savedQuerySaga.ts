import { takeLatest } from 'redux-saga/effects';
import { SELECT_SAVED_QUERY } from './constants';
import { queriesActions } from '../queries';
import { selectSavedQuery } from './saga';
import { saveQuerySuccessHandler } from './saga';

export function* savedQuerySaga() {
  yield takeLatest(SELECT_SAVED_QUERY, selectSavedQuery);
  yield takeLatest(
    queriesActions.saveQuerySuccess.type,
    saveQuerySuccessHandler
  );
}
