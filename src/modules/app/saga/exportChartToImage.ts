import { getContext } from 'redux-saga/effects';
import { exportChartToImage as exportChartToImageAction } from '../actions';
import { NOTIFICATION_MANAGER_CONTEXT } from '../../../constants';
import { exportToImage } from '../../../utils';
import { generateFileName } from '../appSaga';

export function* exportChartToImage({
  payload,
}: ReturnType<typeof exportChartToImageAction>) {
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
