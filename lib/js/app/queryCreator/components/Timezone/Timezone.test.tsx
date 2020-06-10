import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, screen } from '@testing-library/react';
import selectEvent from 'react-select-event';
import configureStore from 'redux-mock-store';

import Timezone from './Timezone';
import text from './text.json';

const render = (storeState: any = {}) => {
  const mockStore = configureStore([]);
  const store = mockStore({ ...storeState });

  const wrapper = rtlRender(
    <Provider store={store}>
      <Timezone />
    </Provider>
  );

  return {
    store,
    wrapper,
  };
};

test('allows user to select timezone', async () => {
  const storeState = {
    query: {
      timezone: undefined,
    },
  };

  const {
    store,
    wrapper: { getByLabelText },
  } = render(storeState);
  await selectEvent.select(getByLabelText(text.label), 'Europe/London');

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "timezone": "Europe/London",
        },
        "type": "@query-creator/SELECT_TIMEZONE",
      },
    ]
  `);
});

test('reset timezone settings', async () => {
  const storeState = {
    query: {
      timezone: 'Europe/London',
    },
  };

  const {
    store,
    wrapper: { unmount },
  } = render(storeState);
  unmount();

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "timezone": undefined,
        },
        "type": "@query-creator/SELECT_TIMEZONE",
      },
    ]
  `);
});

test('support named timezones', async () => {
  const storeState = {
    query: {
      timezone: -18000,
    },
  };

  render(storeState);

  expect(screen.getByText('US/Eastern')).toBeInTheDocument();
});
