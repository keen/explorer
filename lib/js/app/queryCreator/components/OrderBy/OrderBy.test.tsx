import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import { createTree, createCollection } from '../../utils';

import OrderBy from './OrderBy';

import { DEFAULT_ORDER_SETTINGS } from './constants';

const render = (storeState: any = {}) => {
  const mockStore = configureStore([]);
  const collectionSchema = { country: 'string', city: 'string' };
  const state = {
    events: {
      schemas: {
        purchases: {
          schema: collectionSchema,
          tree: createTree(collectionSchema),
          list: createCollection(collectionSchema),
        },
      },
    },
    ...storeState,
  };

  const store = mockStore({ ...state });

  const wrapper = rtlRender(
    <Provider store={store}>
      <OrderBy collection="collection" />
    </Provider>
  );

  return {
    store,
    wrapper,
  };
};

test('allows user to set order by property', () => {
  const storeState = {
    query: {
      groupBy: ['country', 'city'],
      orderBy: [{ ...DEFAULT_ORDER_SETTINGS, id: 'id' }],
    },
  };

  const {
    wrapper: { getByTestId, getByText },
    store,
  } = render(storeState);

  const propertyItem = getByTestId('orderBy-property-item');
  fireEvent.click(propertyItem);

  const option = getByText('country');
  fireEvent.click(option);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "orderBy": Array [
            Object {
              "direction": "ASC",
              "id": "id",
              "propertyName": "country",
            },
          ],
        },
        "type": "@query-creator/SET_ORDER_BY",
      },
    ]
  `);
});

test('allows user to set order by direction', () => {
  const storeState = {
    query: {
      groupBy: ['country', 'city'],
      orderBy: [{ ...DEFAULT_ORDER_SETTINGS, id: 'id' }],
    },
  };

  const {
    wrapper: { getByText },
    store,
  } = render(storeState);

  const defaultOrderDirection = getByText('ASC');
  fireEvent.click(defaultOrderDirection);

  const customOrderDirection = getByText('DESC');
  fireEvent.click(customOrderDirection);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "orderBy": Array [
            Object {
              "direction": "DESC",
              "id": "id",
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
      orderBy: [{ ...DEFAULT_ORDER_SETTINGS, id: 'id' }],
    },
  };

  const {
    wrapper: { container },
    store,
  } = render(storeState);

  const removeButton = container.querySelector('button:not(.add-button)');
  fireEvent.click(removeButton);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "orderBy": undefined,
        },
        "type": "@query-creator/SET_ORDER_BY",
      },
    ]
  `);
});
