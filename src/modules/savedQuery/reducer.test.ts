import { savedQueryActions, savedQueryReducer, initialState } from './index';

test('updates saved query state', () => {
  const updates = {
    cached: true,
    refreshRate: 140,
  };
  const action = savedQueryActions.updateSavedQuery(updates);
  const updatedQuery = savedQueryReducer(initialState, action);
  expect(updatedQuery).toMatchObject(updates);
});

test('restores initial state', () => {
  const action = savedQueryActions.resetSavedQuery();
  const state = savedQueryReducer(initialState, action);

  expect(state).toEqual(initialState);
});
