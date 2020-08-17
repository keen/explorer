import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import Confirm from './Confirm';

const render = (storeState: any = {}) => {
  const mockStore = configureStore([]);
  const store = mockStore({ ...storeState });

  const wrapper = rtlRender(
    <Provider store={store}>
      <Confirm />
    </Provider>
  );

  return {
    store,
    wrapper,
  };
};

test('shows modal with confirmation button', () => {
  const storeState = {
    app: {
      confirmModal: {
        visible: true,
      },
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
        "type": "@app/ACCEPT_CONFIRMATION",
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
  };

  const { store } = render(storeState);
  const close = screen.getByText('Cancel');

  fireEvent.click(close);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "type": "@app/HIDE_CONFIRMATION",
      },
    ]
  `);
});
