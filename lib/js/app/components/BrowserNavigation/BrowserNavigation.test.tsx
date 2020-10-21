import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import BrowserNavigation from './BrowserNavigation';

const render = (overProps: any = {}) => {
  const mockStore = configureStore([]);
  const store = mockStore({});

  const props = {
    attractNewQueryButton: false,
    ...overProps,
  };

  const wrapper = rtlRender(
    <Provider store={store}>
      <BrowserNavigation {...props}>
        <div data-testid="children" />
      </BrowserNavigation>
    </Provider>
  );

  return {
    store,
    props,
    wrapper,
  };
};

test('renders children nodes', () => {
  const {
    wrapper: { getByTestId },
  } = render();

  expect(getByTestId('children')).toBeInTheDocument();
});

test('allows user to create a new query', () => {
  const {
    store,
    wrapper: { container },
  } = render();

  const button = container.querySelector('button');
  fireEvent.click(button);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "type": "@app/CREATE_NEW_QUERY",
      },
    ]
  `);
});
