import { appReducer, initialState } from './reducer';

import {
  showConfirmation,
  hideConfirmation,
  acceptConfirmation,
} from './actions';

test('updates "confirmation" state', () => {
  const meta = { queryName: 'count' };
  const action = showConfirmation('delete', meta);

  const { confirmModal } = appReducer(initialState, action);

  expect(confirmModal).toMatchInlineSnapshot(`
    Object {
      "action": "delete",
      "meta": Object {
        "queryName": "count",
      },
      "visible": true,
    }
  `);
});

test('restores initial state after users accept confirmation', () => {
  const action = acceptConfirmation();
  const state = appReducer(initialState, action);

  expect(state.confirmModal).toEqual(initialState.confirmModal);
});

test('restores initial state after users dismiss confirmation', () => {
  const action = hideConfirmation();
  const state = appReducer(initialState, action);

  expect(state.confirmModal).toEqual(initialState.confirmModal);
});
