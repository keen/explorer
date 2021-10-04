import { getContext } from 'redux-saga/effects';
import { NOTIFICATION_MANAGER_CONTEXT } from '../../../constants';
import { exportToImage } from '../../../utils';
import { generateFileName } from './generateFileName';
import { dataExportActions } from '../index';

export function* exportChartToImage({
  payload,
}: ReturnType<typeof dataExportActions.exportChartToImage>) {
  const node = document.getElementById('query-visualization');
  if (!node) throw new Error('Query visualization container is not available');
  const fileName = yield generateFileName();

  const { quality, backgroundColor } = payload;

  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);

  try {
    exportToImage({ fileName, node, quality, backgroundColor });
    yield notificationManager.showNotification({
      type: 'info',
      message: 'notifications.image_download_in_progress',
      autoDismiss: true,
    });
  } catch (err) {
    yield notificationManager.showNotification({
      type: 'error',
      message: 'notifications.image_download_error',
      showDismissButton: true,
      autoDismiss: false,
    });
  }
}