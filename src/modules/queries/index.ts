import { ReducerState } from './types';
import { queriesSlice, initialState } from './reducer';
import {
  runExtraction,
  deleteQuery,
  extractToEmail,
  runEmailExtraction,
  getOrganizationUsageLimits,
  cloneSavedQuery,
  fetchSavedQueries,
  continueExtraction,
  cancelExtraction,
} from './actions';
import {
  getQueryExecutionError,
  getSaveQueryError,
  getSavedQueries,
  getQueriesSaving,
  getSavedQueriesLoaded,
  getCacheQueriesLimit,
  getCacheQueriesLimitExceed,
  getQueryResults,
  getQueryPerformState,
  getQueryLimitReached,
  getQuerySettings,
  getExtractionConfirmation,
} from './selectors';
import { getDefaultVisualization } from './utils';

import { queriesSaga } from './queriesSaga';
import { SavedQueryListItem } from './types';

const queriesReducer = queriesSlice.reducer;

const queriesActions = {
  runExtraction,
  deleteQuery,
  extractToEmail,
  runEmailExtraction,
  getOrganizationUsageLimits,
  cloneSavedQuery,
  fetchSavedQueries,
  continueExtraction,
  cancelExtraction,
  ...queriesSlice.actions,
};

export {
  ReducerState,
  queriesActions,
  getQueryExecutionError,
  getSaveQueryError,
  getQueryResults,
  getQueryPerformState,
  getSavedQueries,
  getSavedQueriesLoaded,
  getQueriesSaving,
  getOrganizationUsageLimits,
  getCacheQueriesLimit,
  getCacheQueriesLimitExceed,
  getQueryLimitReached,
  getQuerySettings,
  getExtractionConfirmation,
  queriesReducer,
  queriesSaga,
  initialState,
  SavedQueryListItem,
  getDefaultVisualization,
};
