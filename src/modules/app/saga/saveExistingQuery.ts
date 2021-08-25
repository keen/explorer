import { put, select, take } from 'redux-saga/effects';

import { savedQueryActions, savedQuerySelectors } from '../../savedQuery';
import {
  saveQuery as saveQueryAction,
  showUpdateSavedQueryModal,
} from '../actions';

export function* saveExistingQuery() {
  const { displayName, refreshRate, tags, name } = yield select(
    savedQuerySelectors.getSavedQuery
  );

  yield put(savedQueryActions.getDashboardsConnection(name));
  yield take(savedQueryActions.getDashboardsConnectionDone.type);

  const dashboards = yield select(savedQuerySelectors.getConnectedDashboards);
  const isDashboardConnectionError = yield select(
    savedQuerySelectors.getConnectedDashboardsError
  );

  if (dashboards?.length || isDashboardConnectionError) {
    yield put(showUpdateSavedQueryModal());
  } else {
    yield put(saveQueryAction(displayName, refreshRate, tags, name));
  }
}
