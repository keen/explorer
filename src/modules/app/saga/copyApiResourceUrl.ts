import { getContext, select } from 'redux-saga/effects';
import { copyToClipboard } from '@keen.io/charts-utils';

import { copyApiResourceUrl as copyApiResourceUrlAction } from '../actions';
import { getQuerySettings } from '../../queries';
import { NOTIFICATION_MANAGER_CONTEXT } from '../../../constants';
import { createResourceUrl } from '../../../utils';

export function* copyApiResourceUrl({
  payload,
}: ReturnType<typeof copyApiResourceUrlAction>) {
  const { config } = payload;
  const query = yield select(getQuerySettings);
  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
  try {
    const url = createResourceUrl({ query, config });
    yield copyToClipboard(url);
    yield notificationManager.showNotification({
      type: 'success',
      message: 'notifications.copy_api_resource_url',
      autoDismiss: true,
    });
  } catch (err) {
    yield notificationManager.showNotification({
      type: 'error',
      message: 'notifications.copy_api_resource_url_error',
      showDismissButton: true,
      autoDismiss: false,
    });
  }
}
