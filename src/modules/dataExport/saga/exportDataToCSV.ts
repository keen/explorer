import { put } from 'redux-saga/effects';
import { dataExportActions } from '../index';

export function* exportDataToCSV() {
  //todo

  console.log('saga', dataExportActions.showCSVExportModal(true));
  // const data = yield select(getQueryResults);
  // const fileName = yield generateFileName();
  // const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);

  yield put(dataExportActions.showCSVExportModal(true));

  // try {
  //   exportToCsv({ data, fileName });
  //   yield notificationManager.showNotification({
  //     type: 'info',
  //     message: 'notifications.csv_download_in_progress',
  //     autoDismiss: true,
  //   });
  // } catch (err) {
  //   yield notificationManager.showNotification({
  //     type: 'error',
  //     message: 'notifications.csv_download_error',
  //     showDismissButton: true,
  //     autoDismiss: false,
  //   });
  // }
}
