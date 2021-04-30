/* eslint-disable @typescript-eslint/camelcase */
import { getContext, select, take, put } from 'redux-saga/effects';
import HttpStatus from 'http-status-codes';

import { runEmailExtraction } from '../actions';

import { getQuerySettings } from '../selectors';

import {
  showEmailExtractionModal,
  hideEmailExtractionModal,
  HIDE_EMAIL_EXTRACTION_MODAL,
} from '../../../modules/app';

import {
  NOTIFICATION_MANAGER_CONTEXT,
  KEEN_CLIENT_CONTEXT,
} from '../../../constants';

/**
 * Flow responsible for performing extraction analysis to email
 * @return void
 *
 */
export function* performExtractionToEmail() {
  yield put(showEmailExtractionModal());
  const action = yield take([
    HIDE_EMAIL_EXTRACTION_MODAL,
    runEmailExtraction.type,
  ]);

  if (action.type === runEmailExtraction.type) {
    const client = yield getContext(KEEN_CLIENT_CONTEXT);
    const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
    const query = yield select(getQuerySettings);
    try {
      yield put(hideEmailExtractionModal());
      const { latest, email, contentEncoding, contentType } = action.payload;
      const body = {
        ...query,
        email,
        latest,
        content_type: contentType,
        content_encoding: contentEncoding,
      };
      yield client.query(body);
      yield notificationManager.showNotification({
        type: 'info',
        message: 'notifications.prepare_email_extraction',
        autoDismiss: true,
      });
    } catch (error) {
      const { status } = error;
      if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
        yield notificationManager.showNotification({
          type: 'error',
          message: 'notifications.email_extraction_error',
          showDismissButton: true,
          autoDismiss: false,
        });
      } else {
        yield notificationManager.showNotification({
          type: 'error',
          message: error.body,
          translateMessage: false,
          autoDismiss: true,
        });
      }
    }
  }
}
