import { savedQuerySaga } from './savedQuerySaga';
import {
  selectSavedQuery,
  getDashboardsConnection,
  getDashboardsConnectionDone,
  fetchSavedQuery,
  fetchSavedQuerySuccess,
} from './actions';
import { convertMilisecondsToMinutes, serializeSavedQuery } from './utils';
import { ReducerState, ConnectedDashboard } from './types';
import { savedQuerySelectors } from './selectors';
import { savedQuerySlice, initialState } from './reducer';

const savedQueryReducer = savedQuerySlice.reducer;

const savedQueryActions = {
  ...savedQuerySlice.actions,
  selectSavedQuery,
  getDashboardsConnection,
  getDashboardsConnectionDone,
  fetchSavedQuery,
  fetchSavedQuerySuccess,
};

const savedQueryUtils = {
  convertMilisecondsToMinutes,
  serializeSavedQuery,
};

export {
  savedQueryReducer,
  savedQueryActions,
  savedQuerySelectors,
  savedQueryUtils,
  savedQuerySaga,
  initialState,
  ReducerState,
  ConnectedDashboard,
};
