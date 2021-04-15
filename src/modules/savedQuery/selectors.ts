import { AppState } from '../types';

export const getSavedQuery = ({ savedQuery }: AppState) => savedQuery;

export const getSavedQueryName = ({ savedQuery }: AppState) => savedQuery.name;

export const getSavedQueryDisplayName = ({ savedQuery }: AppState) =>
  savedQuery.displayName;
