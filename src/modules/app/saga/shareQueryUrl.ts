import { call, getContext, select } from 'redux-saga/effects';
import { copyToClipboard } from '@keen.io/charts-utils';

import { savedQuerySelectors } from '../../savedQuery';
import { getQuerySettings } from '../../queries';
import { getVisualization } from '../selectors';
import { b64EncodeUnicode, getLocationUrl } from '../utils';
import { URL_STATE } from '../constants';
import { NOTIFICATION_MANAGER_CONTEXT } from '../../../constants';

export function* shareQueryUrl() {
  const savedQuery = yield select(savedQuerySelectors.getSavedQuery);
  const query = yield select(getQuerySettings);
  const visualization = yield select(getVisualization);
  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);

  try {
    const stateToPersist = yield call(
      b64EncodeUnicode,
      JSON.stringify({
        savedQuery,
        visualization,
        query,
      })
    );

    const url = `${getLocationUrl()}?${URL_STATE}=${stateToPersist}`;
    yield copyToClipboard(url);

    yield notificationManager.showNotification({
      type: 'success',
      message: 'notifications.share_query_success',
      autoDismiss: true,
    });
  } catch (err) {
    yield notificationManager.showNotification({
      type: 'error',
      message: 'notifications.share_query_error',
      showDismissButton: true,
      autoDismiss: false,
    });
  }
}
