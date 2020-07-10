import { filtersReducer, initialState } from './reducer';
import {
  addFilter,
  updateFilter,
  removeFilter,
  resetFilters,
  setFilters,
} from './actions';

import { Filter } from '../../types';

test('add filter', () => {
  const initialState:Filter[] = [{"propertyName":"state","operator":"ne","propertyValue":"Arizona"}];
  const action = addFilter();

  const state = filtersReducer(initialState, action);

  expect(state).toEqual([...initialState, null]);
});

test('update filter', () => {
  const initialState:Filter[] = [{"propertyName":"state","operator":"ne","propertyValue":"Arizona"}];
  const action = updateFilter(0, {operator: "eq"});

  const state = filtersReducer(initialState, action);

  expect(state).toEqual([{"propertyName":"state","operator":"eq","propertyValue":"Arizona"}])
});

test('remove filter', () => {
  const initialState:Filter[] = [{"propertyName":"state","operator":"ne","propertyValue":"Arizona"}];
  const action = removeFilter(0);

  const state = filtersReducer(initialState, action);

  expect(state).toEqual([]);
});

test('reset filters', () => {
  const initialState:Filter[] = [{"propertyName":"state","operator":"ne","propertyValue":"Arizona"}, {"propertyName":"state","operator":"ne","propertyValue":"Texas"}];
  const action = resetFilters();

  const state = filtersReducer(initialState, action);

  expect(state).toEqual([]);
})

test('set filters', () => {
  const filters:Filter[] = [{"propertyName":"state","operator":"ne","propertyValue":"Arizona"}];
  const action = setFilters(filters);

  const state = filtersReducer(initialState, action);

  expect(state).toEqual(filters);
});