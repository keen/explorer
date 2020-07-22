import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import TargetProperty from './TargetProperty';
import text from './text.json';

const render = (storeState: any = {}, props: any = {}) => {
  const mockStore = configureStore([]);
  const store = mockStore({ ...storeState });

  const wrapper = rtlRender(
    <Provider store={store}>
      <TargetProperty {...props} />
    </Provider>
  );

  return {
    store,
    wrapper,
  };
};

test('allows user to select target property', async () => {
  const storeState = {
    query: {
      targetProperty: 'date',
    },
    events: {
      schemas: {
        purchases: { date: 'String', userId: 'String' },
      },
    },
  };

  const {
    store,
    wrapper: { getByText, getByTestId },
  } = render(storeState, { collection: 'purchases' });

  const propertyField = getByTestId('property-container');
  fireEvent.click(propertyField);

  const property = getByText('userId');
  fireEvent.click(property);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "property": "userId",
        },
        "type": "@query-creator/SELECT_TARGET_PROPERTY",
      },
    ]
  `);
});

test('reset target property settings', async () => {
  const storeState = {
    query: {
      targetProperty: 'date',
    },
    events: {
      schemas: {
        purchases: { date: 'String', userId: 'String' },
      },
    },
  };

  const {
    store,
    wrapper: { unmount },
  } = render(storeState, { collection: 'purchases' });
  unmount();

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "property": null,
        },
        "type": "@query-creator/SELECT_TARGET_PROPERTY",
      },
    ]
  `);
});
