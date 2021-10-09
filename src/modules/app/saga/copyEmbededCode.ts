import { getContext } from 'redux-saga/effects';
import { copyToClipboard } from '@keen.io/charts-utils';
import { NOTIFICATION_MANAGER_CONTEXT } from '../../../constants';
import { copyEmbeddedCode as copyEmbeddedCodeAction } from '../actions';
import { getCodeSnippet } from './getCodeSnippet';

export function* copyEmbeddedCode({
  payload,
}: ReturnType<typeof copyEmbeddedCodeAction>) {
  const { projectId, readKey } = payload;
  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);

  try {
    const snippet = yield getCodeSnippet(projectId, readKey);
    copyToClipboard(snippet);
    yield notificationManager.showNotification({
      type: 'success',
      message: 'notifications.copy_embedded_code_success',
      autoDismiss: true,
    });
  } catch (err) {
    yield notificationManager.showNotification({
      type: 'error',
      message: 'notifications.copy_embedded_code_error',
      showDismissButton: true,
      autoDismiss: false,
    });
  }
}
