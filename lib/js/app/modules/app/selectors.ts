import { AppState } from '../types';

export const getConfirmation = ({ app }: AppState) => app.confirmModal;

export const getQuerySettingsModalVisibility = ({ app }: AppState) =>
  app.querySettingsModal.visible;

export const getQuerySettingsModalSource = ({ app }: AppState) =>
  app.querySettingsModal.source;

export const getVisualizationType = ({ app }: AppState) =>
  app.visualization.type;

export const getViewMode = ({ app }: AppState) => app.view;

export const getBrowserScreenDimension = ({ app }: AppState) =>
  app.browserScreen;
