import { Filter } from '../../types';

import {
  ADD_FILTER,
  UPDATE_FILTER,
  REMOVE_FILTER,
  RESET_FILTERS,
  SET_FILTERS
} from './constants';

interface AddFilterAction {
  type: typeof ADD_FILTER;
}

interface UpdateFilterAction {
  type: typeof UPDATE_FILTER,
  payload: {
    index: number;
    value: Partial<Filter>;
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

interface SetFiltersAction {
  type: typeof SET_FILTERS,
  payload: {
    filters: Filter[]
  }
}

export type FiltersActions =
  | AddFilterAction
  | UpdateFilterAction
  | RemoveFilterAction
  | ResetFiltersAction
  | SetFiltersAction;
