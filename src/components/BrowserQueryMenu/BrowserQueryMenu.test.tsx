/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import BrowserQueryMenu from './BrowserQueryMenu';

const render = (overProps: any = {}, overStore: any = {}) => {
  const props = {
    onEditQuery: jest.fn(),
    onRemoveQuery: jest.fn(),
    ...overProps,
  };

  const mockStore = configureStore([]);
  const store = mockStore({
    savedQuery: {
      isQueryEditable: true,
    },
    queries: {
      settings: {
        analysis_type: 'count',
      },
    },
    ...overStore,
  });

  const wrapper = rtlRender(
    <Provider store={store}>
      <BrowserQueryMenu {...props} />
    </Provider>
  );

  return {
    props,
    store,
    wrapper,
  };
};
describe('Scenario 1: Browser query menu - query is editable', () => {
  test('shows <BrowserQueryMenu />', () => {
    const {
      wrapper: { container },
    } = render();
    expect(container).toBeInTheDocument();
  });

  test('allows user to edit query', () => {
    const {
      wrapper: { getByText },
      props,
    } = render();
    const editQuery = getByText('browser_query_menu.edit_query');

    fireEvent.click(editQuery);
    expect(props.onEditQuery).toHaveBeenCalled();
  });

  test('allows user to edit query settings', () => {
    const {
      wrapper: { getByTestId },
      store,
    } = render();
    const contextButtonsContainer = getByTestId('context-buttons');
    const editSettingsBtn = contextButtonsContainer.querySelector('button');

    fireEvent.click(editSettingsBtn);

    expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "source": 0,
        },
        "type": "@app/SHOW_QUERY_SETTINGS_MODAL",
      },
    ]
  `);
  });

  test('allows user to share query url', () => {
    const {
      wrapper: { getByTestId },
      store,
    } = render();

    const shareQuery = getByTestId('share-query');
    const shareQueryBtn = shareQuery.querySelector('button');

    fireEvent.click(shareQueryBtn);

    expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": undefined,
        "type": "@app/SHARE_QUERY_URL",
      },
    ]
  `);
  });
});

describe('Scenario 2: Browser query menu - query is not editable', () => {
  const store = {
    savedQuery: {
      isQueryEditable: false,
    },
  };
  test('shows <BrowserQueryMenu />', () => {
    const {
      wrapper: { container },
    } = render({}, store);
    expect(container).toBeInTheDocument();
  });

  test('not allows user to edit query', () => {
    const {
      wrapper: { getByText },
      props,
    } = render({}, store);
    const editQuery = getByText('browser_query_menu.edit_query');

    fireEvent.click(editQuery);
    expect(props.onEditQuery).not.toHaveBeenCalled();
  });

  test('share query button is not visible', () => {
    const {
      wrapper: { queryByTestId },
    } = render({}, store);
    const shareQueryBtn = queryByTestId('share-query');

    expect(shareQueryBtn).toBeNull();
  });

  test('query settings button is not visible', () => {
    const {
      wrapper: { queryByTestId },
    } = render({}, store);
    const shareQueryBtn = queryByTestId('query-settings');

    expect(shareQueryBtn).toBeNull();
  });
});

describe('Scenario 3: Browser query menu - multi-analysis query', () => {
  const store = {
    queries: {
      settings: {
        analysis_type: 'multi_analysis',
      },
    },
  };
  test('shows <BrowserQueryMenu />', () => {
    const {
      wrapper: { container },
    } = render({}, store);
    expect(container).toBeInTheDocument();
  });

  test('not allows user to edit query', () => {
    const {
      wrapper: { getByText },
      props,
    } = render({}, store);
    const editQuery = getByText('browser_query_menu.edit_query');

    fireEvent.click(editQuery);
    expect(props.onEditQuery).not.toHaveBeenCalled();
  });

  test('share query button is not visible', () => {
    const {
      wrapper: { queryByTestId },
    } = render({}, store);
    const shareQueryBtn = queryByTestId('share-query');

    expect(shareQueryBtn).toBeNull();
  });
});
