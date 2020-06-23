import React from 'react';
import { Provider } from 'react-redux';
import selectEvent from 'react-select-event';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import OrderBy from './OrderBy';
import text from './text.json';

import { DEFAULT_ORDER_SETTINGS } from './constants';

const render = (storeState: any = {}) => {
  const mockStore = configureStore([]);
  const store = mockStore({ ...storeState });

  const wrapper = rtlRender(
    <Provider store={store}>
      <OrderBy />
    </Provider>
  );

  return {
    store,
    wrapper,
  };
};

test('allows user to set order by property', async () => {
  const storeState = {
    query: {
      groupBy: ['country', 'city'],
      orderBy: DEFAULT_ORDER_SETTINGS,
    },
  };

  const {
    wrapper: { getByLabelText },
    store,
  } = render(storeState);
  await selectEvent.select(getByLabelText(text.propetyLabel), 'country');

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "orderBy": Array [
            Object {
              "direction": "ASC",
              "propertyName": "country",
            },
          ],
        },
        "type": "@query-creator/SET_ORDER_BY",
      },
    ]
  `);
});

test('allows user to set order by direction', async () => {
  const storeState = {
    query: {
      groupBy: ['country', 'city'],
      orderBy: DEFAULT_ORDER_SETTINGS,
    },
  };

  const {
    wrapper: { getByLabelText },
    store,
  } = render(storeState);
  await selectEvent.select(getByLabelText(text.directionLabel), 'Descending');

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "orderBy": Array [
            Object {
              "direction": "DESC",
              "propertyName": "result",
            },
          ],
        },
        "type": "@query-creator/SET_ORDER_BY",
      },
    ]
  `);
});

test('allows user to remove order by settings', () => {
  const storeState = {
    query: {
      groupBy: ['country', 'city'],
      orderBy: DEFAULT_ORDER_SETTINGS,
    },
  };

  const {
    wrapper: { getByTestId },
    store,
  } = render(storeState);

  const removeButton = getByTestId('orderby-remove-0');
  fireEvent.click(removeButton);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "orderBy": Array [],
        },
        "type": "@query-creator/SET_ORDER_BY",
      },
    ]
  `);
});
