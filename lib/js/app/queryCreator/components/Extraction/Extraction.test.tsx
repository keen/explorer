import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import { createTree, createCollection } from '../../utils';
import Extraction from './Extraction';

jest.mock('uuid', () => {
  return {
    v4: () => 'mock-id',
  };
});

const collectionSchema = { date: 'String', userId: 'String' };

const render = (overStoreState: any = {}, overProps: any = {}) => {
  const mockStore = configureStore([]);
  const storeState = {
    query: {
      propertyNames: [],
      latest: 100,
    },
    events: {
      schemas: {
        purchases: {
          schema: collectionSchema,
          tree: createTree(collectionSchema),
          list: createCollection(collectionSchema),
        },
      },
    },
    ...overStoreState,
  };

  const store = mockStore({ ...storeState });

  const props = {
    collection: 'purchases',
    ...overProps,
  };

  const wrapper = rtlRender(
    <Provider store={store}>
      <Extraction {...props} />
    </Provider>
  );

  return {
    store,
    wrapper,
  };
};

test('allows user to change extraction limit', () => {
  const {
    wrapper: { container },
    store,
  } = render();

  const input = container.querySelector('input[type="number"]');
  fireEvent.change(input, { target: { value: 200 } });

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "limit": 200,
        },
        "type": "@query-creator/SET_EXTRACTION_LIMIT",
      },
    ]
  `);
});

test('allows user to add extraction properties', () => {
  const {
    wrapper: { getByTestId },
    store,
  } = render();

  const button = getByTestId('action-button');
  fireEvent.click(button);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "propertyNames": Array [
            Object {
              "id": "mock-id",
              "propertyName": "",
            },
          ],
        },
        "type": "@query-creator/SET_PROPERTY_NAMES",
      },
    ]
  `);
});

test('allows user to edit extraction properties', () => {
  const storeState = {
    query: {
      propertyNames: [{ id: '1', propertyName: 'userId' }],
      latest: 100,
    },
  };

  const {
    wrapper: { getByTestId, getByText },
    store,
  } = render(storeState);

  const propertyItem = getByTestId('searchable-property');
  fireEvent.click(propertyItem);

  const option = getByText('date');
  fireEvent.click(option);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "propertyNames": Array [
            Object {
              "id": "1",
              "propertyName": "date",
            },
          ],
        },
        "type": "@query-creator/SET_PROPERTY_NAMES",
      },
    ]
  `);
});

test('allows user to remove extraction properties', () => {
  const storeState = {
    query: {
      propertyNames: [{ id: '1', propertyName: 'userId' }],
      latest: 100,
    },
  };
  const {
    wrapper: { container },
    store,
  } = render(storeState);

  const removeButton = container.querySelector(
    '[data-testid="extraction-settings-item"] [data-testid="action-button"]'
  );
  fireEvent.click(removeButton);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "propertyNames": undefined,
        },
        "type": "@query-creator/SET_PROPERTY_NAMES",
      },
    ]
  `);
});
