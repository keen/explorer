import { AppState } from '../types';

export const getConfirmation = ({ app }: AppState) => app.confirmModal;
