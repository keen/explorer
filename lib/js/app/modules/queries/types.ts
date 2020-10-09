import {
  PickerWidgets,
  ChartSettings,
  WidgetSettings,
} from '@keen.io/widget-picker';

import {
  RUN_QUERY,
  RUN_QUERY_ERROR,
  RUN_QUERY_SUCCESS,
  GET_SAVED_QUERIES,
  GET_SAVED_QUERIES_ERROR,
  GET_SAVED_QUERIES_SUCCESS,
  DELETE_QUERY,
  DELETE_QUERY_ERROR,
  DELETE_QUERY_SUCCESS,
  SAVE_QUERY,
  SAVE_QUERY_ERROR,
  RESET_SAVE_QUERY_ERROR,
  SAVE_QUERY_SUCCESS,
  SET_CACHE_QUERY_LIMIT,
  SET_CACHE_QUERY_LIMIT_EXCEED,
  SET_CACHE_QUERY_LIMIT_ERROR,
  SET_QUERY_LIMIT_REACHED,
  RESET_QUERY_RESULTS,
  GET_ORGANIZATION_USAGE_LIMITS,
  SET_QUERY_SETTINGS,
  SET_QUERY_SAVE_STATE,
  EXTRACT_TO_EMAIL,
  RUN_EMAIL_EXTRACTION,
} from './constants';

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
  stepLabels: string[];
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

export interface ExtractToEmailAction {
  type: typeof EXTRACT_TO_EMAIL;
}

export interface RunEmailExtractionAction {
  type: typeof RUN_EMAIL_EXTRACTION;
  payload: {
    contentType: string;
    contentEncoding: string;
    latest: number;
    email: string;
  };
}

export interface SetQuerySettingsAction {
  type: typeof SET_QUERY_SETTINGS;
  payload: { settings: Record<string, any> };
}

export interface GetOrganizationUsageLimitsAction {
  type: typeof GET_ORGANIZATION_USAGE_LIMITS;
}

export interface ResetQueryResultsAction {
  type: typeof RESET_QUERY_RESULTS;
}

export interface SetCacheQueryLimitExceedAction {
  type: typeof SET_CACHE_QUERY_LIMIT_EXCEED;
  payload: {
    limitReached: boolean;
  };
}

export interface SetCacheQueryLimitAction {
  type: typeof SET_CACHE_QUERY_LIMIT;
  payload: {
    limit: number;
  };
}

export interface SetCacheQueryLimitErrorAction {
  type: typeof SET_CACHE_QUERY_LIMIT_ERROR;
  payload: {
    error: Error;
  };
}

export interface SaveQueryAction {
  type: typeof SAVE_QUERY;
  payload: {
    name: string;
    body: Record<string, any>;
  };
}

export interface QuerySaveStateAction {
  type: typeof SET_QUERY_SAVE_STATE;
  payload: { isSaving: boolean };
}

export interface SaveQuerySuccessAction {
  type: typeof SAVE_QUERY_SUCCESS;
  payload: {
    queryName: string;
    body: Record<string, any>;
  };
}

export interface SaveQueryErrorAction {
  type: typeof SAVE_QUERY_ERROR;
  payload: {
    error: Error;
  };
}

export interface ResetSaveQueryErrorAction {
  type: typeof RESET_SAVE_QUERY_ERROR;
}

export interface DeleteQueryAction {
  type: typeof DELETE_QUERY;
  payload: {
    queryName: string;
  };
}

export interface DeleteQuerySuccessAction {
  type: typeof DELETE_QUERY_SUCCESS;
  payload: {
    queryName: string;
  };
}

export interface DeleteQueryErrorAction {
  type: typeof DELETE_QUERY_ERROR;
  payload: {
    error: Error;
  };
}

export interface GetSavedQueriesAction {
  type: typeof GET_SAVED_QUERIES;
}

export interface GetSavedQueriesSuccessAction {
  type: typeof GET_SAVED_QUERIES_SUCCESS;
  payload: {
    queries: SavedQueryListItem[];
  };
}

export interface GetSavedQueriesErrorAction {
  type: typeof GET_SAVED_QUERIES_ERROR;
  payload: {
    error: Error;
  };
}

export interface RunQueryAction {
  type: typeof RUN_QUERY;
  payload: {
    body: Record<string, any>;
  };
}

export interface RunQuerySuccessAction {
  type: typeof RUN_QUERY_SUCCESS;
  payload: {
    results: Record<string, any>;
  };
}

export interface RunQueryErrorAction {
  type: typeof RUN_QUERY_ERROR;
  payload: {
    error: APIError;
  };
}

export interface SetQueryLimitReachedAction {
  type: typeof SET_QUERY_LIMIT_REACHED;
  payload: {
    queriesExecutionLimitReached: boolean;
  };
}

export type QueriesActions =
  | SetQuerySettingsAction
  | ResetQueryResultsAction
  | SetCacheQueryLimitAction
  | SetCacheQueryLimitExceedAction
  | SetCacheQueryLimitErrorAction
  | SaveQueryAction
  | QuerySaveStateAction
  | SaveQuerySuccessAction
  | SaveQueryErrorAction
  | DeleteQueryAction
  | DeleteQuerySuccessAction
  | DeleteQueryErrorAction
  | RunQueryAction
  | RunQueryErrorAction
  | RunQuerySuccessAction
  | GetSavedQueriesAction
  | GetSavedQueriesSuccessAction
  | GetSavedQueriesErrorAction
  | SetQueryLimitReachedAction
  | ResetSaveQueryErrorAction
  | GetOrganizationUsageLimitsAction
  | ExtractToEmailAction
  | RunEmailExtractionAction;
