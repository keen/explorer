import { AppState } from '../types';

export const getConfirmation = ({ app }: AppState) => app.confirmModal;

export const getVisualizationType = ({ app }: AppState) =>
  app.visualization.type;

export const getViewMode = ({ app }: AppState) => app.view;
