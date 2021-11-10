import React from 'react';
import { Provider } from 'react-redux';
import {
  render as rtlRender,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import UpdateSavedQueryModal from './UpdateSavedQueryModal';

import { AppContext } from '../../contexts';

const render = (storeState: any = {}, overProps: any = {}) => {
  const mockStore = configureStore([]);
  const state = {
    app: {
      updateSavedQueryModal: {
        visible: true,
      },
    },
    project: {
      tagsPool: [],
    },
    savedQuery: {
      name: '',
      displayName: '',
      cached: false,
      refreshRate: 0,
      exists: true,
      isCloned: false,
      tags: [],
      isConnectedDashboardsLoading: false,
      isConnectedDashboardsError: false,
      connectedDashboards: null,
    },
    ...storeState,
  };

  const store = mockStore({ ...state });

  const props = {
    onSaveQuery: jest.fn(),
    cachedAvailable: true,
    ...overProps,
  };

  const wrapper = rtlRender(
    <AppContext.Provider value={{ modalContainer: '#modal-root' } as any}>
      <Provider store={store}>
        <UpdateSavedQueryModal {...props} />
      </Provider>
    </AppContext.Provider>
  );

  return {
    store,
    props,
    wrapper,
  };
};

afterEach(() => {
  cleanup();
  mockAllIsIntersecting(false);
});

beforeEach(() => {
  let modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  }
  mockAllIsIntersecting(true);
});

test('shows error when user is unable to get connected dashboards', () => {
  const savedQuery = {
    name: '',
    displayName: '',
    cached: false,
    refreshRate: 0,
    exists: true,
    isCloned: false,
    tags: [],
    isConnectedDashboardsLoading: false,
    isConnectedDashboardsError: true,
    connectedDashboards: null,
  };
  const {
    wrapper: { getByText },
  } = render({ savedQuery });
  expect(
    getByText('update_saved_query.dashboard_connection_error')
  ).toBeInTheDocument();
});

test('shows connected dashboards', () => {
  const savedQuery = {
    name: '',
    displayName: '',
    cached: false,
    refreshRate: 0,
    exists: true,
    isCloned: false,
    tags: [],
    isConnectedDashboardsLoading: false,
    isConnectedDashboardsError: true,
    connectedDashboards: [{ title: '@dashboard-1', id: '@id1' }],
  };
  const {
    wrapper: { getByText },
  } = render({ savedQuery });

  savedQuery.connectedDashboards.map((dashboard) => {
    expect(getByText(dashboard.title)).toBeInTheDocument();
  });
});

test('enable user to close the modal', () => {
  const {
    wrapper: { getByText },
    store,
  } = render();

  const item = getByText('update_saved_query.cancel');
  fireEvent.click(item);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": undefined,
        "type": "app/hideUpdateSavedQueryModal",
      },
    ]
  `);
});

test('enable user to clone the query', () => {
  const {
    wrapper: { getByText },
    store,
  } = render();

  const item = getByText('update_saved_query.clone_query');
  fireEvent.click(item);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": undefined,
        "type": "queries/cloneSavedQuery",
      },
      Object {
        "payload": undefined,
        "type": "app/hideUpdateSavedQueryModal",
      },
    ]
  `);
});

test('enable user to update the query', () => {
  const {
    wrapper: { getByText },
    store,
  } = render();

  const item = getByText('update_saved_query.update_query');
  fireEvent.click(item);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "displayName": "",
          "name": "",
          "refreshRate": 0,
          "tags": Array [],
        },
        "type": "app/composeSavedQuery",
      },
      Object {
        "payload": undefined,
        "type": "app/hideUpdateSavedQueryModal",
      },
    ]
  `);
});
