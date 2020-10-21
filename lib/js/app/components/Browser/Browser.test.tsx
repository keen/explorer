/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent, act } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import Browser from './Browser';
import { initialState as savedQueryInitialState } from '../../modules/savedQuery';

jest.mock('framer-motion', () => {
  const AnimatePresence = jest.fn(({ children }) => children);
  const motion = {
    div: forwardRef(({ children }, ref: React.LegacyRef<HTMLDivElement>) => (
      <div ref={ref}>{children}</div>
    )),
    tr: forwardRef(
      ({ children }, ref: React.LegacyRef<HTMLTableRowElement>) => (
        <tr ref={ref}>{children}</tr>
      )
    ),
  };

  return {
    AnimatePresence,
    motion,
  };
});

const render = (storeState: any = {}, overProps: any = {}) => {
  const mockStore = configureStore([]);
  const state = {
    savedQuery: savedQueryInitialState,
    queries: {
      isSavedQueriesLoaded: false,
      savedQueries: [],
    },
    app: {
      browserScreen: {
        width: 900,
        height: 700,
      },
    },
    ...storeState,
  };

  const store = mockStore({ ...state });

  const props = {
    onEditQuery: jest.fn(),
    onSelectQuery: jest.fn(),
    onRunQuery: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(
    <Provider store={store}>
      <Browser {...props} />
    </Provider>
  );

  return {
    store,
    props,
    wrapper,
  };
};

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

test('renders loading placeholder', () => {
  const {
    wrapper: { getByTestId },
  } = render();

  expect(getByTestId('queries-placeholder')).toBeInTheDocument();
});

test('do not renders search input for empty list of queries', () => {
  const {
    wrapper: { queryByTestId },
  } = render({
    queries: {
      isSavedQueriesLoaded: true,
      savedQueries: [],
    },
  });

  expect(queryByTestId('search-queries')).not.toBeInTheDocument();
});

test('renders empty search message', () => {
  const savedQueries = [
    {
      name: 'purchases',
      displayName: 'Purchases',
      refreshRate: 0,
      query: {},
      lastModifiedDate: '2020-09-11',
      tags: [],
    },
  ];

  const {
    wrapper: { container, getByTestId },
  } = render({
    queries: {
      isSavedQueriesLoaded: true,
      savedQueries,
      queriesExecution: {
        limitReached: false,
      },
    },
  });

  const input = container.querySelector('input');
  fireEvent.change(input, { target: { value: 'logins' } });

  act(() => {
    jest.runAllTimers();
  });

  expect(getByTestId('empty-search-message')).toBeInTheDocument();
});

test('allows user to filter queries based on search phrase', () => {
  const savedQueries = [
    {
      name: 'purchases',
      displayName: 'Purchases',
      refreshRate: 0,
      query: {},
      lastModifiedDate: '2020-09-11',
      tags: [],
    },
    {
      name: 'logins',
      displayName: 'Logins',
      refreshRate: 0,
      query: {},
      lastModifiedDate: '2020-09-11',
      tags: [],
    },
  ];

  const {
    wrapper: { getAllByTestId, getByText, container },
  } = render(
    {
      queries: {
        isSavedQueriesLoaded: true,
        savedQueries,
        queriesExecution: {
          limitReached: false,
        },
      },
    },
    {}
  );

  const input = container.querySelector('input');
  fireEvent.change(input, { target: { value: 'logins' } });

  act(() => {
    jest.runAllTimers();
  });

  expect(getAllByTestId('saved-query-item').length).toEqual(1);
  expect(getByText('Logins')).toBeInTheDocument();
});
