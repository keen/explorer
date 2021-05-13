import { ReducerState } from './types';
import { SavedQueryActions } from './actions';
import {
  RESET_SAVED_QUERY,
  SET_QUERY_EDITABLE,
  UPDATE_SAVED_QUERY,
  SET_QUERY_LOADING,
} from './constants';

export const initialState: ReducerState = {
  name: '',
  displayName: '',
  tags: [],
  isCloned: false,
  cached: false,
  refreshRate: 0,
  exists: false,
  isQueryEditable: false,
  isQueryLoading: false,
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
    case SET_QUERY_EDITABLE:
      return {
        ...state,
        isQueryEditable: action.payload.isEditable,
      };
    case SET_QUERY_LOADING:
      return {
        ...state,
        isQueryLoading: action.payload.isQueryLoading,
      };
    default:
      return state;
  }
};
