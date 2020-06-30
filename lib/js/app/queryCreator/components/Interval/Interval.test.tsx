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

test('renders custom interval components', () => {
  const {
    wrapper: { getByTestId },
  } = render({
    query: {
      interval: 'every_14_days',
    },
  });

  expect(getByTestId('custom-interval')).toBeInTheDocument();
});

test('renders supported interval components', () => {
  const {
    wrapper: { getByTestId },
  } = render({
    query: {
      interval: 'monthly',
    },
  });

  expect(getByTestId('supported-interval')).toBeInTheDocument();
});

test('allows user to change interval to custom', () => {
  const {
    wrapper: { getByTestId },
    store,
  } = render({
    query: {
      interval: 'monthly',
    },
  });

  const buttonTab = getByTestId('custom-interval-tab');
  fireEvent.click(buttonTab);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "interval": "every_7_days",
        },
        "type": "@query-creator/SET_INTERVAL",
      },
    ]
  `);
});

test('allows user to change interval to supported', () => {
  const {
    wrapper: { getByTestId },
    store,
  } = render({
    query: {
      interval: 'every_10_years',
    },
  });

  const buttonTab = getByTestId('supported-interval-tab');
  fireEvent.click(buttonTab);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "interval": "daily",
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
