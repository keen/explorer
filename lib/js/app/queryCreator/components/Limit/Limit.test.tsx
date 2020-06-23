import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import Limit from './Limit';

const render = (storeState: any = {}) => {
  const mockStore = configureStore([]);
  const store = mockStore({ ...storeState });

  const wrapper = rtlRender(
    <Provider store={store}>
      <Limit />
    </Provider>
  );

  return {
    store,
    wrapper,
  };
};

test('allows user to set limit', () => {
  const {
    wrapper: { container },
    store,
  } = render({
    query: {
      limit: undefined,
    },
  });
  const input = container.querySelector('input[type="number"]');

  fireEvent.change(input, { target: { value: 80 } });

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "limit": 80,
        },
        "type": "@query-creator/SET_LIMIT",
      },
    ]
  `);
});

test('allows user to remove limit', () => {
  const {
    wrapper: { container },
    store,
  } = render({
    query: {
      limit: 100,
    },
  });
  const input = container.querySelector('input[type="number"]');

  fireEvent.change(input, { target: { value: null } });

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "limit": undefined,
        },
        "type": "@query-creator/SET_LIMIT",
      },
    ]
  `);
});
