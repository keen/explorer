import React from 'react';
import { Provider } from 'react-redux';
import {
  render as rtlRender,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import configureStore from 'redux-mock-store';

import GroupBy from './GroupBy';
import text from './text.json';

const render = (storeState: any = {}, overProps: any = {}) => {
  const mockStore = configureStore([]);
  const store = mockStore({ ...storeState });

  const wrapper = rtlRender(
    <Provider store={store}>
      <GroupBy {...overProps} />
    </Provider>
  );

  return {
    store,
    wrapper,
  };
};

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
    wrapper: { getByTestId },
    store,
  } = render(storeState, { collection: 'purchases' });

  const button = getByTestId('action-button');
  fireEvent.click(button);

  waitFor(() => {
    const element = getByTestId('groupBy-settings-item');
    expect(element).toBeInTheDocument();
  });

});

test('should render exact number of properties with preserved order', async () => {
  const storeState = {
    query: {
      groupBy: ['date', 'userId'],
    },
    events: {
      schemas: {
        purchases: { date: 'String', userId: 'String' },
      },
    },
  };

  const {
    wrapper: { getAllByTestId },
  } = render(storeState, { collection: 'purchases' });

  const items = getAllByTestId('groupBy-property');

  expect(items.length).toEqual(Object.keys(storeState.query.groupBy).length);

  items.forEach((item, idx) => {
    expect(item.textContent).toEqual(`${storeState.query.groupBy[idx]}×`);
  });
});

test('should render title', () => {
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
    wrapper: { getByText },
  } = render(storeState, { collection: 'purchases' });

  const title = getByText(text.title);
  expect(title).toBeInTheDocument();
});
