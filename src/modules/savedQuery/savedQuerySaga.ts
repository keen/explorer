import { takeLatest } from 'redux-saga/effects';
import { queriesActions } from '../queries';
import { selectSavedQuery } from './saga';
import { saveQuerySuccessHandler } from './saga';
import { savedQueryActions } from './index';

export function* savedQuerySaga() {
  yield takeLatest(savedQueryActions.selectSavedQuery.type, selectSavedQuery);
  yield takeLatest(
    queriesActions.saveQuerySuccess.type,
    saveQuerySuccessHandler
  );
}
