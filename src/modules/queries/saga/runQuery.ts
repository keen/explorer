/* eslint-disable @typescript-eslint/camelcase */
import { getContext, put } from 'redux-saga/effects';

import { scrollToElement } from './scrollToElement';
import { queriesSlice } from '../reducer';

import {
  NOTIFICATION_MANAGER_CONTEXT,
  KEEN_CLIENT_CONTEXT,
} from '../../../constants';

import { ERRORS } from '../constants';

/**
 * Flow responsible for performing analysis based on query settings
 * @param query - query definition
 * @return void
 *
 */
export function* runQuery(
  action: ReturnType<typeof queriesSlice.actions.runQuery>
) {
  try {
    const {
      payload: { query },
    } = action;

    const client = yield getContext(KEEN_CLIENT_CONTEXT);
    const responseBody = yield client.query(query);

    yield put(queriesSlice.actions.runQuerySuccess({ results: responseBody }));
  } catch (error) {
    const { body, error_code } = error;
    yield put(queriesSlice.actions.runQueryError({ error }));

    if (error_code === ERRORS.TOO_MANY_QUERIES) {
      yield put(
        queriesSlice.actions.setQueryLimitReached({
          queriesExecutionLimitReached: true,
        })
      );
    } else {
      const notificationManager = yield getContext(
        NOTIFICATION_MANAGER_CONTEXT
      );
      yield notificationManager.showNotification({
        type: 'error',
        translateMessage: false,
        message: body,
      });
    }
  } finally {
    const element = document.getElementById('editor');
    if (element) {
      yield scrollToElement(element);
    }
  }
}
