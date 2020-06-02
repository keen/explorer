import { AppState } from '../../types';

export const getQueryCreator = (state: any) => state.ui;

export const getAnalysis = (state: AppState) => state.query.analysis;

export const getEventCollection = (state: AppState) =>
  state.query.eventCollection;

export const getTargetProperty = (state: AppState) =>
  state.query.targetProperty;

export const getPercentile = (state: AppState) => state.query.percentile;

export const getTimeframe = (state: AppState) => state.query.timeframe;
