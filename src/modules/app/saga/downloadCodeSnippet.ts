import { getContext } from 'redux-saga/effects';
import { NOTIFICATION_MANAGER_CONTEXT } from '../../../constants';
import { exportToHtml } from '../../../utils';
import { generateFileName } from '../../dataExport/saga';
import { downloadCodeSnippet as downloadCodeSnippetAction } from '../actions';
import { getCodeSnippet } from './getCodeSnippet';

export function* downloadCodeSnippet({
  payload,
}: ReturnType<typeof downloadCodeSnippetAction>) {
  const { projectId, readKey } = payload;
  const fileName = yield generateFileName();
  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);

  try {
    const data = yield getCodeSnippet(projectId, readKey);
    exportToHtml({ data, fileName });

    yield notificationManager.showNotification({
      type: 'success',
      message: 'notifications.html_download_in_progress',
      autoDismiss: true,
    });
  } catch (err) {
    yield notificationManager.showNotification({
      type: 'error',
      message: 'notifications.html_download_error',
      showDismissButton: true,
      autoDismiss: false,
    });
  }
}
