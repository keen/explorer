/* eslint-disable @typescript-eslint/camelcase */
import { getContext, select, take, put } from 'redux-saga/effects';
import HttpStatus from 'http-status-codes';

import { deleteQueryError, deleteQuery as deleteQueryAction } from '../actions';

import { queriesSlice } from '../reducer';

import {
  showConfirmation,
  getViewMode,
  setViewMode,
  selectFirstSavedQuery,
  switchToQueriesList,
  HIDE_CONFIRMATION,
  ACCEPT_CONFIRMATION,
} from '../../../modules/app';

import {
  DASHBOARDS_API_CONTEXT,
  NOTIFICATION_MANAGER_CONTEXT,
} from '../../../constants';

import { savedQueryActions } from '../../savedQuery';

import { ERRORS } from '../constants';

export function* deleteQuery(action: ReturnType<typeof deleteQueryAction>) {
  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
  const dashboardsApiUrl = yield getContext(DASHBOARDS_API_CONTEXT);

  try {
    const {
      payload: { queryName },
    } = action;
    yield put(showConfirmation('delete', { queryName }));

    if (dashboardsApiUrl) {
      yield put(savedQueryActions.getDashboardsConnection(queryName));
    }

    const confirm = yield take([ACCEPT_CONFIRMATION, HIDE_CONFIRMATION]);

    if (confirm.type === ACCEPT_CONFIRMATION) {
      const client = yield getContext('keenClient');
      yield client
        .del(client.url('queries', 'saved', queryName))
        .auth(client.masterKey())
        .send();

      const view = yield select(getViewMode);
      if (view === 'editor') yield put(setViewMode('browser'));

      yield put(queriesSlice.actions.resetQueryResults());
      yield put(queriesSlice.actions.deleteQuerySuccess({ queryName }));
      yield put(selectFirstSavedQuery());

      yield notificationManager.showNotification({
        type: 'info',
        message: 'notifications.query_delete_success',
        autoDismiss: true,
      });
    }
  } catch (error) {
    const { error_code, status } = error;
    if (error_code === ERRORS.RESOURCE_NOT_FOUND) {
      yield put(queriesSlice.actions.resetQueryResults());
      yield put(switchToQueriesList());
      yield put(selectFirstSavedQuery());

      yield notificationManager.showNotification({
        type: 'error',
        message: 'notifications.query_already_deleted',
        autoDismiss: true,
      });
    }

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      yield notificationManager.showNotification({
        type: 'error',
        message: 'notifications.query_delete_error',
        showDismissButton: true,
        autoDismiss: false,
      });
    }

    yield put(deleteQueryError(error));
  }
}
