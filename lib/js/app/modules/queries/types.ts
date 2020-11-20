import {
  PickerWidgets,
  ChartSettings,
  WidgetSettings,
} from '@keen.io/widget-picker';

import {
  setQuerySettings,
  resetQueryResults,
  runQuery,
  deleteQuery,
  setQuerySaveState,
  extractToEmail,
  runEmailExtraction,
  saveQuery,
  resetSavedQueryError,
  getOrganizationUsageLimits,
  cloneSavedQuery,
  getSavedQueries,
  setCacheQueryLimit,
  setQueryCacheLimitError,
  setQueryLimitReached,
  setCacheQueryLimitExceed,
  saveQueryError,
  saveQuerySuccess,
  getSavedQueriesError,
  getSavedQueriesSuccess,
  deleteQueryError,
  deleteQuerySuccess,
  runQuerySuccess,
  runQueryError,
} from './actions';

import { APIError } from '../../types';

export type Visualization = {
  type: PickerWidgets;
  chartSettings: ChartSettings;
  widgetSettings: WidgetSettings;
};

export type SavedQueryListItem = {
  name: string;
  displayName: string;
  refreshRate: number;
  lastModifiedDate: string;
  cached: boolean;
  query: Record<string, any>;
  tags: string[];
  visualization: Visualization;
};

export type ReducerState = {
  results: any;
  settings: Record<string, any>;
  isQueryPerforming: boolean;
  isSavedQueriesLoaded: boolean;
  isSavingQuery: boolean;
  savedQueries: SavedQueryListItem[];
  cachedQueries: {
    limit: null | number;
    limitReached: boolean;
  };
  queriesExecution: {
    limitReached: boolean;
  };
  saveQueryError: APIError | null;
  error: APIError | null;
};

export type QueriesActions =
  | ReturnType<typeof setQuerySettings>
  | ReturnType<typeof resetQueryResults>
  | ReturnType<typeof setCacheQueryLimit>
  | ReturnType<typeof setCacheQueryLimitExceed>
  | ReturnType<typeof setQueryCacheLimitError>
  | ReturnType<typeof saveQuery>
  | ReturnType<typeof setQuerySaveState>
  | ReturnType<typeof saveQuerySuccess>
  | ReturnType<typeof saveQueryError>
  | ReturnType<typeof deleteQuery>
  | ReturnType<typeof deleteQuerySuccess>
  | ReturnType<typeof deleteQueryError>
  | ReturnType<typeof runQuery>
  | ReturnType<typeof runQueryError>
  | ReturnType<typeof runQuerySuccess>
  | ReturnType<typeof getSavedQueries>
  | ReturnType<typeof getSavedQueriesSuccess>
  | ReturnType<typeof getSavedQueriesError>
  | ReturnType<typeof setQueryLimitReached>
  | ReturnType<typeof resetSavedQueryError>
  | ReturnType<typeof getOrganizationUsageLimits>
  | ReturnType<typeof extractToEmail>
  | ReturnType<typeof runEmailExtraction>
  | ReturnType<typeof cloneSavedQuery>;
