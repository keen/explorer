import {
  ADD_FILTER,
  UPDATE_FILTER,
  REMOVE_FILTER,
  RESET_FILTERS,
} from './constants';

import { FiltersActions } from './types';
import { Filter } from '../../types';

export const initialState: Filter[] = [];

type State = (Filter | null)[];

export const filtersReducer = (state: State, action: FiltersActions): State => {
  switch (action.type) {
    case RESET_FILTERS:
      return initialState;
    case ADD_FILTER:
      return [...state, null];
    case UPDATE_FILTER:
      return state.map((filter, idx) => {
        if (idx === action.payload.index) return action.payload.filter;
        return filter;
      });
    case REMOVE_FILTER:
      return state.filter((_, idx) => idx !== action.payload.index);
    default:
      return state;
  }
};
