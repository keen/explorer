import { AppState } from '../types';

export const getQueryCreator = (state: any) => state.ui;

export const getAnalysis = (state: AppState) => state.queryCreator.analysis;

export const getEventCollection = (state: AppState) =>
  state.queryCreator.eventCollection;
