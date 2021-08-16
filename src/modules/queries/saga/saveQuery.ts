/* eslint-disable @typescript-eslint/camelcase */
import { getContext, select, put } from 'redux-saga/effects';
import HttpStatus from 'http-status-codes';

import { queriesSlice } from '../reducer';

import {
  getQuerySettingsModalVisibility,
  appSlice,
} from '../../../modules/app';

import {
  NOTIFICATION_MANAGER_CONTEXT,
  KEEN_CLIENT_CONTEXT,
} from '../../../constants';

import { ERRORS } from '../constants';

/**
 * Flow responsible for saving query definition
 * @param name - name of query
 * @param body - query settings
 * @return void
 *
 */
export function* saveQuery({
  payload,
}: ReturnType<typeof queriesSlice.actions.saveQuery>) {
  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
  try {
    const { name, body } = payload;
    const client = yield getContext(KEEN_CLIENT_CONTEXT);
    const settingsModalVisible = yield select(getQuerySettingsModalVisibility);

    const responseBody = yield client.put({
      url: client.url('queries', 'saved', name),
      apiKey: client.config.masterKey,
      params: body,
    });

    if (settingsModalVisible) {
      yield put(appSlice.actions.hideQuerySettingsModal());
    }

    yield put(
      queriesSlice.actions.saveQuerySuccess({ name, body: responseBody })
    );
    yield notificationManager.showNotification({
      type: 'success',
      message: 'notifications.save_query_success',
    });
  } catch (error) {
    const { status, error_code: errorCode } = error;

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      yield put(appSlice.actions.hideQuerySettingsModal());
      yield notificationManager.showNotification({
        type: 'error',
        message: 'notifications.save_query_error',
        showDismissButton: true,
        autoDismiss: false,
      });
    } else {
      const settingsModalVisible = yield select(
        getQuerySettingsModalVisibility
      );
      if (settingsModalVisible) {
        yield put(queriesSlice.actions.setSaveQueryError({ error }));
      } else {
        yield put(queriesSlice.actions.setQuerySaveState({ isSaving: false }));
        yield notificationManager.showNotification({
          type: 'error',
          message: error.body,
          translateMessage: false,
          autoDismiss: true,
        });
      }
    }

    if (
      errorCode === ERRORS.OVER_LIMIT_ERROR ||
      errorCode === ERRORS.TOO_MANY_CACHED_QUERIES
    ) {
      yield put(
        queriesSlice.actions.setCacheQueryLimitExceed({ limitReached: true })
      );
    }
  }
}
