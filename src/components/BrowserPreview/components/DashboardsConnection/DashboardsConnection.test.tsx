import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import DashboardsConnection from './DashboardsConnection';

const render = (storeState: any = {}, overProps: any = {}) => {
  const mockStore = configureStore([]);
  const state = {
    savedQuery: {
      isConnectedDashboardsLoading: false,
      isConnectedDashboardsError: false,
      connectedDashboards: null,
    },
    ...storeState,
  };

  const store = mockStore({ ...state });

  const props = {
    onSaveQuery: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(
    <Provider store={store}>
      <DashboardsConnection {...props} />
    </Provider>
  );

  return {
    store,
    props,
    wrapper,
  };
};

test('renders empty dashboards list notification', () => {
  const {
    wrapper: { getByText },
  } = render();

  const item = getByText('browser_preview.dashboards_none');
  expect(item).toBeInTheDocument();
});

test('renders error notification', () => {
  const {
    wrapper: { getByText },
  } = render({ savedQuery: { isConnectedDashboardsError: true } });

  const item = getByText('browser_preview.dashboard_connection_error');
  expect(item).toBeInTheDocument();
});

test('renders loader', () => {
  const {
    wrapper: { container },
  } = render({ savedQuery: { isConnectedDashboardsLoading: true } });

  const loader = container.querySelector('svg');
  expect(loader).toBeInTheDocument();
});
