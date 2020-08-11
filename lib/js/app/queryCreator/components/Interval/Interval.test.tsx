import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import Interval from './Interval';

const render = (storeState: any = {}) => {
  const mockStore = configureStore([]);
  const store = mockStore({ ...storeState });

  const wrapper = rtlRender(
    <Provider store={store}>
      <Interval />
    </Provider>
  );

  return {
    store,
    wrapper,
  };
};

test('set supported interval', () => {
  const {
    wrapper: { getByText, getByTestId },
    store,
  } = render({
    query: {
      interval: 'monthly',
    },
  });

  const dropableContainer = getByTestId('dropable-container');
  fireEvent.click(dropableContainer);

  const button = getByText('weekly');
  fireEvent.click(button);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "interval": "weekly",
        },
        "type": "@query-creator/SET_INTERVAL",
      },
    ]
  `);
});

test('set custom interval', () => {
  const {
    wrapper: { getByTestId },
    store,
  } = render({
    query: {
      interval: 'every_7_days',
    },
  });

  const dropableContainer = getByTestId('dropable-container');
  fireEvent.click(dropableContainer);

  const input = getByTestId('relative-time-input');
  fireEvent.change(input, { target: { value: 30 } });

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "interval": "every_30_days",
        },
        "type": "@query-creator/SET_INTERVAL",
      },
    ]
  `);
});

test('reset interval settings by clicking action button', () => {
  const {
    wrapper: { getByTestId },
    store,
  } = render({
    query: {
      interval: 'every_10_years',
    },
  });

  const resetButton = getByTestId('action-button');
  fireEvent.click(resetButton);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "interval": undefined,
        },
        "type": "@query-creator/SET_INTERVAL",
      },
    ]
  `);
});

test('reset interval settings', () => {
  const {
    wrapper: { unmount },
    store,
  } = render({
    query: {
      interval: 'every_10_years',
    },
  });
  unmount();

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "interval": undefined,
        },
        "type": "@query-creator/SET_INTERVAL",
      },
    ]
  `);
});
