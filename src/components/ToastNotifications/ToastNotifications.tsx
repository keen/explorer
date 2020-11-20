import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useToasts } from '@keen.io/toast-notifications';

import { AppContext } from '../../contexts';

import { ToastSettings } from '../../modules/notifications';
import { notificationsMounted } from '../../modules/app';

import { SHOW_TOAST_NOTIFICATION_EVENT } from '../../constants';

const ToastNotifications = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { addToast } = useToasts();

  const { notificationPubSub } = useContext(AppContext);

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
              translateMessage = true,
            } = meta;

            const notificationMessage = translateMessage ? t(message) : message;

            addToast(notificationMessage, {
              appearance: type,
              autoDismiss,
              showDismissButton,
            });
            break;
        }
      }
    );

    dispatch(notificationsMounted());

    return () => dispose();
  }, []);

  return null;
};

export default ToastNotifications;
