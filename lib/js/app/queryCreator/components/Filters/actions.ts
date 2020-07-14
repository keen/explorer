import {
  ADD_FILTER,
  UPDATE_FILTER,
  REMOVE_FILTER,
  RESET_FILTERS,
  SET_FILTERS,
} from './constants';

import { FiltersActions } from './types';
import { Filter } from '../../types';

export const addFilter = (): FiltersActions => ({
  type: ADD_FILTER,
});

export const updateFilter = (
  index: number,
  value: Partial<Filter>
): FiltersActions => ({
  type: UPDATE_FILTER,
  payload: {
    index,
    value,
  },
});

export const removeFilter = (index: number): FiltersActions => ({
  type: REMOVE_FILTER,
  payload: { index },
});

export const resetFilters = (): FiltersActions => ({
  type: RESET_FILTERS,
});

export const setFilters = (filters: Filter[]): FiltersActions => ({
  type: SET_FILTERS,
  payload: { filters },
});
