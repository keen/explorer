import { getContext, put } from 'redux-saga/effects';
import { SavedQueryAPIResponse } from '../../../types';
import {
  KEEN_CLIENT_CONTEXT,
  NOTIFICATION_MANAGER_CONTEXT,
} from '../../../constants';
import { fetchSavedQuery as fetchSavedQueryAction } from '../actions';
import { savedQueryActions } from '../index';
import { queriesActions } from '../../queries';

export function* fetchSavedQuery({
  payload,
}: ReturnType<typeof fetchSavedQueryAction>) {
  try {
    const queryId = payload.queryId;
    const client = yield getContext(KEEN_CLIENT_CONTEXT);
    const responseBody: SavedQueryAPIResponse = yield client
      .get(client.url('queries', 'saved', queryId))
      .auth(client.masterKey())
      .send();
    yield put(
      queriesActions.setQuerySettings({ settings: responseBody.query })
    );
    yield put(savedQueryActions.fetchSavedQuerySuccess());
  } catch (error) {
    const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
    yield notificationManager.showNotification({
      type: 'error',
      message: 'notifications.query_not_exist',
      showDismissButton: false,
      autoDismiss: true,
    });
  }
}
