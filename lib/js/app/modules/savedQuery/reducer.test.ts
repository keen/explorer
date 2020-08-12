import { savedQueryReducer, initialState } from './reducer';

import { updateSaveQuery, resetSavedQuery } from './actions';

test('updates saved query state', () => {
  const updates = {
    cached: true,
    refreshRate: 140,
  };
  const action = updateSaveQuery(updates);
  const updatedQuery = savedQueryReducer(initialState, action);

  expect(updatedQuery).toMatchObject(updates);
});

test('restores initial state', () => {
  const action = resetSavedQuery();
  const state = savedQueryReducer(initialState, action);

  expect(state).toEqual(initialState);
});
