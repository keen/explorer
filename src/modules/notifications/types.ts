export type ToastSettings = {
  autoDismiss?: boolean;
  showDismissButton?: boolean;
  translateMessage?: boolean;
  message: string;
  type: 'error' | 'success' | 'info';
};
