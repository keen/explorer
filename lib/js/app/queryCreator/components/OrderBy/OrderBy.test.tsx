import React from 'react';
import { Provider } from 'react-redux';
import {
  render as rtlRender,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import configureStore from 'redux-mock-store';

import { createTree, createCollection } from '../../utils';

import OrderBy from './OrderBy';

import { DEFAULT_ORDER_SETTINGS } from './constants';

const render = (storeState: any = {}, overProps: any = {}) => {
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
      <OrderBy {...overProps} />
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
  } = render(storeState, { collection: 'collection' });

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
  } = render(storeState, { collection: 'collection' });

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
  } = render(storeState, { collection: 'collection' });

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

test('should render tooltip with notification about the group by', async () => {
  const storeState = {
    query: {
      groupBy: [],
    },
  };

  const {
    wrapper: { getByTestId, getByText },
  } = render(storeState, { collection: 'collection' });

  const wrapper = getByTestId('order-by-wrapper');
  fireEvent.mouseEnter(wrapper);

  waitFor(() => {
    expect(
      getByText('query_creator_order_by.order_result')
    ).toBeInTheDocument();
  });
});

test('should render tooltip with notification about the event stream', async () => {
  const storeState = {
    query: {
      groupBy: [],
    },
  };

  const {
    wrapper: { getByTestId, getByText },
  } = render(storeState);

  const wrapper = getByTestId('order-by-wrapper');
  fireEvent.mouseEnter(wrapper);

  waitFor(() => {
    expect(getByText('query_creator_order_by.tooltip')).toBeInTheDocument();
  });
});
