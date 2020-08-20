import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import QuerySettingsModal from './QuerySettingsModal';

const render = (storeState: any = {}, overProps: any = {}) => {
  const mockStore = configureStore([]);
  const state = {
    app: {
      querySettingsModal: {
        visible: true,
      },
    },
    queries: {
      isSaving: false,
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
    <Provider store={store}>
      <QuerySettingsModal {...props} />
    </Provider>
  );

  return {
    store,
    props,
    wrapper,
  };
};

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
        "type": "@app/HIDE_QUERY_SETTINGS_MODAL",
      },
      Object {
        "type": "@queries/RESET_SAVE_QUERY_ERROR",
      },
      Object {
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
        "type": "@app/HIDE_QUERY_SETTINGS_MODAL",
      },
      Object {
        "type": "@queries/RESET_SAVE_QUERY_ERROR",
      },
    ]
  `);
});
