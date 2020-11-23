import { AppState } from '../types';

export const getConfirmation = ({ app }: AppState) => app.confirmModal;

export const getExtractToEmailModalVisibility = ({ app }: AppState) =>
  app.extractToEmailModal.visible;

export const getQuerySettingsModalVisibility = ({ app }: AppState) =>
  app.querySettingsModal.visible;

export const getQuerySettingsModalSource = ({ app }: AppState) =>
  app.querySettingsModal.source;

export const getEmbedModalVisibility = ({ app }: AppState) =>
  app.embedModal.visible;

export const getVisualization = ({ app }: AppState) => app.visualization;

export const getViewMode = ({ app }: AppState) => app.view;

export const getBrowserScreenDimension = ({ app }: AppState) =>
  app.browserScreen;

export const getQueryAutorun = ({ app }: AppState) => app.autorunQuery;
