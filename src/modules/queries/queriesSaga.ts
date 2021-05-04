/* eslint-disable @typescript-eslint/camelcase */
import { takeLatest } from 'redux-saga/effects';

import {
  extractToEmail,
  runExtraction,
  fetchSavedQueries,
  getOrganizationUsageLimits,
  deleteQuery as deleteQueryAction,
  cloneSavedQuery as cloneSavedQueryAction,
} from './actions';

import {
  runQuery,
  saveQuery,
  deleteQuery,
  cloneSavedQuery,
  fetchSavedQueriesList,
  checkOrganizationLimits,
  performExtraction,
  performExtractionToEmail,
} from './saga';

import { queriesSlice } from './reducer';

export function* queriesSaga() {
  yield takeLatest(runExtraction.type, performExtraction);
  yield takeLatest(extractToEmail.type, performExtractionToEmail);
  yield takeLatest(queriesSlice.actions.runQuery.type, runQuery);
  yield takeLatest(deleteQueryAction.type, deleteQuery);
  yield takeLatest(queriesSlice.actions.saveQuery.type, saveQuery);
  yield takeLatest(
    [
      fetchSavedQueries.type,
      queriesSlice.actions.saveQuerySuccess.type,
      queriesSlice.actions.deleteQuerySuccess.type,
    ],
    fetchSavedQueriesList
  );
  yield takeLatest(
    [
      getOrganizationUsageLimits.type,
      queriesSlice.actions.saveQuerySuccess.type,
      queriesSlice.actions.deleteQuerySuccess.type,
    ],
    checkOrganizationLimits
  );
  yield takeLatest(cloneSavedQueryAction.type, cloneSavedQuery);
}
