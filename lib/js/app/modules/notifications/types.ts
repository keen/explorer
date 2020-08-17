export type ToastSettings = {
  autoDismiss?: boolean;
  showDismissButton?: boolean;
  message: string;
  type: 'error' | 'success' | 'info';
};
