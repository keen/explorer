import React from 'react';
import { Provider } from 'react-redux';
import {
  render as rtlRender,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import configureStore from 'redux-mock-store';

import QuerySettingsModal from './QuerySettingsModal';

import { AppContext } from '../../contexts';

const render = (storeState: any = {}, overProps: any = {}) => {
  const mockStore = configureStore([]);
  const state = {
    app: {
      querySettingsModal: {
        visible: true,
      },
    },
    project: {
      tagsPool: [],
    },
    queries: {
      isSaving: false,
      savedQueries: [],
      cachedQueries: {
        limit: 5,
        limitReached: false,
      },
    },
    savedQuery: {
      name: '',
      displayName: '',
      cached: false,
      refreshRate: 0,
      exists: false,
      tags: [],
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
        <QuerySettingsModal {...props} />
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
});

beforeEach(() => {
  let modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  }
});

test('close modal and reset query settings', () => {
  const {
    wrapper: { getByTestId },
    store,
  } = render();

  const closeButton = getByTestId('modal-close');
  fireEvent.click(closeButton);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": undefined,
        "type": "@app/HIDE_QUERY_SETTINGS_MODAL",
      },
      Object {
        "payload": undefined,
        "type": "queries/resetSavedQueryError",
      },
      Object {
        "payload": undefined,
        "type": "@saved-query/RESET_SAVED_QUERY",
      },
    ]
  `);
});

test('allows user to close modal', () => {
  const savedQuery = {
    name: '',
    displayName: '',
    cached: false,
    refreshRate: 0,
    exists: true,
    tags: [],
  };
  const {
    wrapper: { getByTestId },
    store,
  } = render({ savedQuery });

  const closeButton = getByTestId('modal-close');
  fireEvent.click(closeButton);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": undefined,
        "type": "@app/HIDE_QUERY_SETTINGS_MODAL",
      },
      Object {
        "payload": undefined,
        "type": "queries/resetSavedQueryError",
      },
    ]
  `);
});
