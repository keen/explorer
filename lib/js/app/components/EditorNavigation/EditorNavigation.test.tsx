import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import EditorNavigation from './EditorNavigation';

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
    savedQuery: {
      name: '',
      displayName: '',
      cached: false,
      refreshRate: 0,
      exists: false,
      tags: [],
    },
    queries: {
      isSaving: false,
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
      <EditorNavigation {...props} />
    </Provider>
  );

  return {
    store,
    props,
    wrapper,
  };
};

test('renders saved query name', () => {
  const savedQuery = {
    name: 'purchases',
    displayName: 'Purchases',
    cached: false,
    refreshRate: 0,
    exists: true,
    tags: [],
  };
  const {
    wrapper: { getByText },
  } = render({ savedQuery });

  expect(getByText(savedQuery.displayName)).toBeInTheDocument();
});

test('allows user to open query settings', () => {
  const savedQuery = {
    name: 'purchases',
    displayName: 'Purchases',
    cached: false,
    refreshRate: 0,
    exists: true,
    tags: [],
  };
  const {
    wrapper: { getByTestId },
  } = render({ savedQuery });

  expect(getByTestId('query-settings')).toBeInTheDocument();
});

test('renders "New Query" for not existing query', () => {
  const {
    wrapper: { getByText },
  } = render();

  expect(getByText('editor.new_query_title')).toBeInTheDocument();
});

test('renders badge with query cache indicator', () => {
  const savedQuery = {
    name: 'purchases',
    displayName: 'Purchases',
    cached: true,
    refreshRate: 4,
    exists: true,
    tags: [],
  };
  const {
    wrapper: { getByTestId },
  } = render({ savedQuery });

  expect(getByTestId('cache-badge')).toBeInTheDocument();
});

test('allows user to save query', () => {
  const savedQuery = {
    name: 'purchases',
    displayName: 'Purchases',
    cached: false,
    refreshRate: 0,
    exists: true,
    tags: [],
  };
  const {
    props,
    wrapper: { getByText },
  } = render({ savedQuery });

  const button = getByText('editor.save_query_button');
  fireEvent.click(button);

  expect(props.onSaveQuery).toHaveBeenCalled();
});

test('opens query settings modal for not existing query', () => {
  const {
    store,
    wrapper: { getByText },
  } = render();

  const button = getByText('editor.save_query_button');
  fireEvent.click(button);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "source": 1,
        },
        "type": "@app/SHOW_QUERY_SETTINGS_MODAL",
      },
    ]
  `);
});

test('allows user to return to the saved queries list', () => {
  const {
    store,
    wrapper: { getByText },
  } = render();

  const link = getByText('editor.back_to_saved_queries');
  fireEvent.click(link);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": undefined,
        "type": "@app/SWITCH_TO_QUERIES_LIST",
      },
    ]
  `);
});
