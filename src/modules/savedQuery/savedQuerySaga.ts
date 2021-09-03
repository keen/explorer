import { takeLatest } from 'redux-saga/effects';
import { queriesActions } from '../queries';
import {
  selectSavedQuery,
  saveQuerySuccessHandler,
  getConnectedDashboards,
} from './saga';
import { savedQueryActions } from './index';

export function* savedQuerySaga() {
  yield takeLatest(savedQueryActions.selectSavedQuery.type, selectSavedQuery);
  yield takeLatest(
    queriesActions.saveQuerySuccess.type,
    saveQuerySuccessHandler
  );
  yield takeLatest(
    savedQueryActions.getDashboardsConnection.type,
    getConnectedDashboards
  );
}
