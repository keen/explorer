import { ReducerState } from './types';
import { SavedQueryActions } from './actions';
import { UPDATE_SAVED_QUERY, RESET_SAVED_QUERY } from './constants';

export const initialState: ReducerState = {
  name: '',
  displayName: '',
  tags: [],
  isCloned: false,
  cached: false,
  refreshRate: 0,
  exists: false,
};

export const savedQueryReducer = (
  state: ReducerState = initialState,
  action: SavedQueryActions
) => {
  switch (action.type) {
    case UPDATE_SAVED_QUERY:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_SAVED_QUERY:
      return initialState;
    default:
      return state;
  }
};
