import {
  SELECT_EVENT_COLLECTION,
  SELECT_ANALYSIS,
  DEFAULT_ANALYSIS,
} from './constants';

import { ReducerState, QueryCreatorActions } from './types';

export const initialState: ReducerState = {
  eventCollection: null,
  analysis: DEFAULT_ANALYSIS,
};

export const queryCreatorReducer = (
  state: ReducerState = initialState,
  action: QueryCreatorActions
) => {
  switch (action.type) {
    case SELECT_ANALYSIS:
      return {
        ...state,
        analysis: action.payload.analysis,
      };
    case SELECT_EVENT_COLLECTION:
      return {
        ...state,
        eventCollection: action.payload.name,
      };
    default:
      return state;
  }
};
