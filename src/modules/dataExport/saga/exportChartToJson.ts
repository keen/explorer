import { getContext, select } from 'redux-saga/effects';
import { getQueryResults } from '../../queries';
import { NOTIFICATION_MANAGER_CONTEXT } from '../../../constants';
import { exportToJson } from '../../../utils';
import { generateFileName } from './generateFileName';

export function* exportChartToJson() {
  const data = yield select(getQueryResults);
  const fileName = yield generateFileName();
  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);

  try {
    exportToJson({ data, fileName });
    yield notificationManager.showNotification({
      type: 'info',
      message: 'notifications.json_download_in_progress',
      autoDismiss: true,
    });
  } catch (err) {
    yield notificationManager.showNotification({
      type: 'error',
      message: 'notifications.json_download_error',
      showDismissButton: true,
      autoDismiss: false,
    });
  }
}
