import React from 'react';
import { Provider } from 'react-redux';
import {
  render as rtlRender,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import configureStore from 'redux-mock-store';

import GroupBy from './GroupBy';

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

test('do not allows user to add empty group by settings', async () => {
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
    wrapper: { getByTestId, queryByTestId },
  } = render(storeState, { collection: 'purchases' });

  const button = getByTestId('action-button');
  fireEvent.click(button);

  waitFor(() => {
    const element = getByTestId('groupBy-settings-item');
    fireEvent.click(element);

    expect(queryByTestId('groupBy-settings-item')).not.toBeInTheDocument();
  });
});

test('allows user to add group by settings', async () => {
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

  const items = getAllByTestId('searchable-property');

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

  const title = getByText('query_creator_group_by.title');
  expect(title).toBeInTheDocument();
});

test('should render tooltip', async () => {
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
    wrapper: { getByTestId, getByText },
  } = render(storeState);

  const wrapper = getByTestId('group-by-wrapper');
  fireEvent.mouseEnter(wrapper);

  waitFor(() => {
    expect(getByText('query_creator_group_by.tooltip')).toBeInTheDocument();
  });
});
