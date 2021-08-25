import { getContext, select } from 'redux-saga/effects';
import { getQueryResults } from '../../queries';
import { NOTIFICATION_MANAGER_CONTEXT } from '../../../constants';
import { exportToCsv } from '../../../utils';
import { generateFileName } from '../appSaga';

export function* exportDataToCsv() {
  const data = yield select(getQueryResults);
  const fileName = yield generateFileName();
  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);

  try {
    exportToCsv({ data, fileName });
    yield notificationManager.showNotification({
      type: 'info',
      message: 'notifications.csv_download_in_progress',
      autoDismiss: true,
    });
  } catch (err) {
    yield notificationManager.showNotification({
      type: 'error',
      message: 'notifications.csv_download_error',
      showDismissButton: true,
      autoDismiss: false,
    });
  }
}
