import { useContext, useEffect } from 'react';
import { useToasts } from '@keen.io/toast-notifications';

import { AppContext } from '../../contexts';
import { ToastSettings } from '../../modules/notifications';

import { SHOW_TOAST_NOTIFICATION_EVENT } from '../../constants';

const ToastNotifications = () => {
  const { notificationPubSub } = useContext(AppContext);
  const { addToast } = useToasts();

  useEffect(() => {
    const dispose = notificationPubSub.subscribe(
      (eventName, meta: ToastSettings) => {
        switch (eventName) {
          case SHOW_TOAST_NOTIFICATION_EVENT:
            const {
              type,
              message,
              autoDismiss = true,
              showDismissButton,
            } = meta;
            addToast(message, {
              appearance: type,
              autoDismiss,
              showDismissButton,
            });
            break;
        }
      }
    );

    return () => dispose();
  });

  return null;
};

export default ToastNotifications;
