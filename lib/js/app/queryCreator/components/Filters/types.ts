import { Filter } from '../../types';

import {
  ADD_FILTER,
  UPDATE_FILTER,
  REMOVE_FILTER,
  RESET_FILTERS,
} from './constants';

interface AddFilterAction {
  type: typeof ADD_FILTER;
}

interface UpdateFilterAction {
  type: typeof UPDATE_FILTER,
  payload: {
    index: number;
    filter: Filter;
  };
}

interface RemoveFilterAction {
  type: typeof REMOVE_FILTER,
  payload: {
    index: number;
  };
}

interface ResetFiltersAction {
  type: typeof RESET_FILTERS
}

export type FiltersActions =
  | AddFilterAction
  | UpdateFilterAction
  | RemoveFilterAction
  | ResetFiltersAction;
