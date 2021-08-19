import { savedQuerySaga } from './savedQuerySaga';
import { selectSavedQuery } from './actions';
import { convertMilisecondsToMinutes, serializeSavedQuery } from './utils';
import { ReducerState, ConnectedDashboard } from './types';
import { savedQuerySelectors } from './selectors';
import { savedQuerySlice, initialState } from './reducer';

const savedQueryReducer = savedQuerySlice.reducer;

const savedQueryActions = {
  ...savedQuerySlice.actions,
  selectSavedQuery,
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
