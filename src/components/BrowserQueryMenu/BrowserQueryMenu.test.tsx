import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import BrowserQueryMenu from './BrowserQueryMenu';

const render = (overProps: any = {}) => {
  const props = {
    onEditQuery: jest.fn(),
    onRemoveQuery: jest.fn(),
    ...overProps,
  };

  const mockStore = configureStore([]);
  const store = mockStore({});

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
