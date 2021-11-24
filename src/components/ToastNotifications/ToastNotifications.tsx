import { useContext, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useToasts, ToastOptions } from '@keen.io/toast-notifications';

import { AppContext } from '../../contexts';

import { ToastSettings } from '../../modules/notifications';

import { SHOW_TOAST_NOTIFICATION_EVENT } from '../../constants';
import { appActions } from '../../modules/app';

const ToastNotifications = () => {
  const dispatch = useDispatch();
  const toastsBuffer = useRef<ToastSettings[]>([]);

  const { t, i18n } = useTranslation();
  const { addToast } = useToasts();
  const { notificationPubSub } = useContext(AppContext);

  const showToast = useCallback(
    (message: string, toastSettings: Partial<ToastSettings>) => {
      const { autoDismiss, showDismissButton, type } = toastSettings;
      addToast(message, {
        appearance: type,
        autoDismiss,
        showDismissButton,
      } as ToastOptions);
    },
    []
  );

  useEffect(() => {
    if (i18n.isInitialized) {
      toastsBuffer.current.forEach(({ message, ...settings }) => {
        const { translateMessage, ...restSettings } = settings;
        const notificationMessage = translateMessage ? t(message) : message;
        showToast(notificationMessage, restSettings);
      });
      toastsBuffer.current = [];
    }
  }, [i18n.isInitialized]);

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

            if (i18n.isInitialized) {
              const notificationMessage = translateMessage
                ? t(message)
                : message;
              showToast(notificationMessage, {
                type,
                autoDismiss,
                translateMessage,
                showDismissButton,
              });
            } else {
              toastsBuffer.current.push({
                message,
                type,
                autoDismiss,
                translateMessage,
                showDismissButton,
              });
            }
            break;
        }
      }
    );

    dispatch(appActions.notificationsMounted());

    return () => dispose();
  }, []);

  return null;
};

export default ToastNotifications;
