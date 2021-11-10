import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import { AppContext } from '../../contexts';

import Confirm from './Confirm';

const render = (storeState: any = {}, context: any = {}) => {
  const mockStore = configureStore([]);
  const store = mockStore({ ...storeState });
  const wrapper = rtlRender(
    <AppContext.Provider value={context}>
      <Provider store={store}>
        <Confirm />
      </Provider>
    </AppContext.Provider>
  );

  return {
    store,
    wrapper,
  };
};

afterEach(() => {
  mockAllIsIntersecting(false);
});

beforeEach(() => {
  mockAllIsIntersecting(true);
});

test('shows modal with confirmation button', () => {
  const storeState = {
    app: {
      confirmModal: {
        visible: true,
      },
    },
    savedQuery: {
      name: 'saved-query',
    },
  };

  const {
    wrapper: { container },
  } = render(storeState);

  const button = container.querySelector('button');

  expect(button).toBeInTheDocument();
});

test('allows user to accept confirmation', () => {
  const storeState = {
    app: {
      confirmModal: {
        visible: true,
      },
    },
    savedQuery: {
      name: 'saved-query',
    },
  };

  const {
    wrapper: { container },
    store,
  } = render(storeState);
  const button = container.querySelector('button');

  fireEvent.click(button);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": undefined,
        "type": "app/acceptConfirmation",
      },
    ]
  `);
});

test('allows user to close modal by clicking "cancel" label', () => {
  const storeState = {
    app: {
      confirmModal: {
        visible: true,
      },
    },
    savedQuery: {
      name: 'saved-query',
    },
  };

  const { store } = render(storeState);
  const close = screen.getByText('confirm.cancel_label');

  fireEvent.click(close);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": undefined,
        "type": "app/hideConfirmation",
      },
    ]
  `);
});

test('shows loader when connected dashboards are loading', () => {
  const storeState = {
    app: {
      confirmModal: {
        visible: true,
      },
    },
    savedQuery: {
      name: 'saved-query',
      isConnectedDashboardsLoading: true,
    },
  };

  const context = {
    enableDashboardsConnection: true,
  };

  const {
    wrapper: { getByTestId },
  } = render(storeState, context);

  const loader = getByTestId('loader');

  expect(loader).toBeInTheDocument();
});

test('shows list of dashboards when query has connections', () => {
  const storeState = {
    app: {
      confirmModal: {
        visible: true,
      },
    },
    savedQuery: {
      name: 'saved-query',
      connectedDashboards: [{ title: 'Dashboard1', id: 'Dashboard1' }],
    },
  };

  const context = {
    enableDashboardsConnection: true,
  };

  const {
    wrapper: { getByTestId },
  } = render(storeState, context);

  const dashboardsList = getByTestId('connected-dashboards');

  expect(dashboardsList).toBeInTheDocument();
});

test('shows error when unable to get connected dashboards', () => {
  const storeState = {
    app: {
      confirmModal: {
        visible: true,
      },
    },
    savedQuery: {
      name: 'saved-query',
      isConnectedDashboardsError: true,
    },
  };

  const context = {
    enableDashboardsConnection: true,
  };

  const {
    wrapper: { getByText },
  } = render(storeState, context);

  const connectedDashboardsError = getByText(
    'confirm.unable_to_get_connected_dashboards'
  );

  expect(connectedDashboardsError).toBeInTheDocument();
});
