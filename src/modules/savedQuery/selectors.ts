import { AppState } from '../types';

export const getSavedQuery = ({ savedQuery }: AppState) => savedQuery;

export const getSavedQueryName = ({ savedQuery }: AppState) => savedQuery.name;

export const getSavedQueryDisplayName = ({ savedQuery }: AppState) =>
  savedQuery.displayName;

export const getSavedQueryLoading = ({ savedQuery }: AppState) =>
  savedQuery.isQueryLoading;

export const getSavedQueryIsEditable = ({ savedQuery }: AppState) =>
  savedQuery.isQueryEditable;

export const getConnectedDashboardsLoading = ({ savedQuery }: AppState) =>
  savedQuery.isConnectedDashboardsLoading;

export const getConnectedDashboardsError = ({ savedQuery }: AppState) =>
  savedQuery.isConnectedDashboardsError;

export const getConnectedDashboards = ({ savedQuery }: AppState) =>
  savedQuery.connectedDashboards;

export const savedQuerySelectors = {
  getSavedQuery,
  getSavedQueryName,
  getSavedQueryDisplayName,
  getSavedQueryLoading,
  getSavedQueryIsEditable,
  getConnectedDashboardsLoading,
  getConnectedDashboardsError,
  getConnectedDashboards,
};
