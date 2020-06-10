import { groupByReducer, initialState } from './reducer';

import { setGroups, addGroup, removeGroup, selectGroupProperty, resetGroups } from './actions';

test('set groups', () => {
  const groups = ['city'];
  const action = setGroups(groups);

  const state = groupByReducer(initialState, action);

  expect(state).toEqual(groups);
});

test('add additional group settings', () => {
  const initialState = ['city'];
  const action = addGroup();

  const state = groupByReducer(initialState, action);

  expect(state).toEqual([...initialState, null]);
});

test('remove group', () => {
  const initialState = ['city', 'name'];
  const action = removeGroup(1);

  const state = groupByReducer(initialState, action);

  expect(state).toEqual(['city']);
});

test('select group property', () => {
  const initialState = ['city', 'country'];
  const action = selectGroupProperty(0, 'section');

  const state = groupByReducer(initialState, action);

  expect(state).toEqual(['section', 'country']);
});

test('reset groups settings', () => {
  const initialState = ['city'];
  const action = resetGroups();

  const state = groupByReducer(initialState, action);

  expect(state).toEqual([]);
});
