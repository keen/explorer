import { AppState } from '../../types';

export const getQuery = (state: AppState) => state.query;

export const getAnalysis = (state: AppState) => state.query.analysisType;

export const getEventCollection = (state: AppState) =>
  state.query.eventCollection;

export const getTargetProperty = (state: AppState) =>
  state.query.targetProperty;

export const getPercentile = (state: AppState) => state.query.percentile;

export const getTimeframe = (state: AppState) => state.query.timeframe;

export const getTimezone = (state: AppState) => state.query.timezone;

export const getFunnelSteps = (state: AppState) => state.query.steps;

export const getGroupBy = (state: AppState) => state.query.groupBy;

export const getOrderBy = (state: AppState) => state.query.orderBy;

export const getInterval = (state: AppState) => state.query.interval;

export const getLimit = (state: AppState) => state.query.limit;

export const getExtractionPropertyNames = (state: AppState) =>
  state.query.propertyNames;

export const getExtractionLimit = (state: AppState) => state.query.latest;

export const getFilters = (state: AppState) => state.query.filters;
