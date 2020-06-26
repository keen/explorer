import React from 'react';
import { Provider } from 'react-redux';
import {
  render as rtlRender,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import selectEvent from 'react-select-event';
import configureStore from 'redux-mock-store';

import GroupBy from './GroupBy';
import text from './text.json';

const render = (storeState: any = {}, overProps: any = {}) => {
  const mockStore = configureStore([]);
  const store = mockStore({ ...storeState });

  const props = {
    ...overProps,
  };

  const wrapper = rtlRender(
    <Provider store={store}>
      <GroupBy {...props} />
    </Provider>
  );

  return {
    store,
    wrapper,
  };
};

test('allows users to remove group by settings', () => {
  const storeState = {
    query: {
      groupBy: ['userId'],
    },
    events: {
      schemas: {
        purchases: { date: 'String', userId: 'String' },
      },
    },
  };

  const {
    wrapper: { getByText },
    store,
  } = render(storeState, { collection: 'purchases' });
  const button = getByText(text.removeGroup);
  fireEvent.click(button);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "groupBy": undefined,
        },
        "type": "@query-creator/SET_GROUP_BY",
      },
    ]
  `);
});

test('allows users to add group by settings', async () => {
  const storeState = {
    query: {
      groupBy: undefined,
    },
    events: {
      schemas: {
        purchases: { date: 'String', userId: 'String' },
      },
    },
  };

  const {
    wrapper: { getByText, getByLabelText },
    store,
  } = render(storeState, { collection: 'purchases' });
  const button = getByText(text.addGroup);
  fireEvent.click(button);

  await selectEvent.select(getByLabelText(text.label), 'userId');

  waitFor(() => {
    expect(store.getActions()).toMatchInlineSnapshot(`
      Array [
        Object {
          "payload": Object {
            "groupBy": undefined,
          },
          "type": "@query-creator/SET_GROUP_BY",
        },
      ]
    `);
  });
});
