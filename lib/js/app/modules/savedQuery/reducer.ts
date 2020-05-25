import { SavedQueryActions, ReducerState } from './types';

import {
  UPDATE_SAVED_QUERY,
  RESET_SAVED_QUERY,
  SAVE_QUERY_SUCCESS,
} from './constants';

export const initialState: ReducerState = {
  name: '',
  displayName: '',
  cached: false,
  refreshRate: 0,
  exists: false,
};

export const savedQueryReducer = (
  state: ReducerState = initialState,
  action: SavedQueryActions
) => {
  switch (action.type) {
    case SAVE_QUERY_SUCCESS:
      return {
        ...state,
        exists: true,
      };
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
