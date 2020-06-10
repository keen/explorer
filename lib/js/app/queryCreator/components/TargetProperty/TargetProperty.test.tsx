import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender } from '@testing-library/react';
import selectEvent from 'react-select-event';
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
      targetProperty: null,
    },
    events: {
      schemas: {
        purchases: { date: 'String', userId: 'String' },
      },
    },
  };

  const {
    store,
    wrapper: { getByLabelText },
  } = render(storeState, { collection: 'purchases' });
  await selectEvent.select(getByLabelText(text.label), 'userId');

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
      targetProperty: null,
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
