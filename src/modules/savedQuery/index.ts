import { savedQuerySaga } from './savedQuerySaga';
import {
  selectSavedQuery,
  getDashboardsConnection,
  getDashboardsConnectionDone,
} from './actions';
import { serializeSavedQuery } from './utils';
import { ReducerState, ConnectedDashboard } from './types';
import { savedQuerySelectors } from './selectors';
import { savedQuerySlice, initialState } from './reducer';

const savedQueryReducer = savedQuerySlice.reducer;

const savedQueryActions = {
  ...savedQuerySlice.actions,
  selectSavedQuery,
  getDashboardsConnection,
  getDashboardsConnectionDone,
};

const savedQueryUtils = {
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
