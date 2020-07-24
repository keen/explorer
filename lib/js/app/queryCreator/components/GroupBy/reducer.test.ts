import { groupByReducer, initialState } from './reducer';

jest.mock('uuid', () => {
  return {
    v4: () => 'mock-id',
  };
});

import {
  setGroups,
  addGroup,
  removeGroup,
  selectGroupProperty,
  resetGroups,
} from './actions';

test('set groups', () => {
  const groups = [{ property: 'city', id: '1' }];
  const action = setGroups(groups);

  const state = groupByReducer(initialState, action);

  expect(state).toEqual(groups);
});

test('add additional group settings', () => {
  const initialState = [{ property: 'city', id: '1' }];
  const action = addGroup('name');

  const state = groupByReducer(initialState, action);

  expect(state).toEqual([
    ...initialState,
    {
      property: 'name',
      id: 'mock-id',
    },
  ]);
});

test('remove group', () => {
  const initialState = [
    { property: 'city', id: '1' },
    { property: 'name', id: '2' },
  ];
  const action = removeGroup('1');

  const state = groupByReducer(initialState, action);

  expect(state).toEqual([{ property: 'name', id: '2' }]);
});

test('select group property', () => {
  const initialState = [
    { property: 'city', id: '1' },
    { property: 'country', id: '2' },
  ];
  const action = selectGroupProperty('1', 'section');

  const state = groupByReducer(initialState, action);

  expect(state).toEqual([
    { property: 'section', id: '1' },
    { property: 'country', id: '2' },
  ]);
});

test('reset groups settings', () => {
  const initialState = [{ property: 'city', id: '1' }];
  const action = resetGroups();

  const state = groupByReducer(initialState, action);

  expect(state).toEqual([]);
});
