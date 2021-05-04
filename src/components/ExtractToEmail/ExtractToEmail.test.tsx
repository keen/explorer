import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import ExtractToEmail from './ExtractToEmail';

const render = (overStoreState: any = {}, overProps: any = {}) => {
  const mockStore = configureStore([]);
  const storeState = {
    queries: {
      settings: {},
    },
    ...overStoreState,
  };

  const store = mockStore({ ...storeState });

  const props = {
    onClose: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(
    <Provider store={store}>
      <ExtractToEmail {...props} />
    </Provider>
  );

  return {
    props,
    store,
    wrapper,
  };
};

test('allows user to close extraction settings modal', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  const button = getByText('extract_to_email.close_button');
  fireEvent.click(button);

  expect(props.onClose).toHaveBeenCalled();
});

test('shows email validation error', () => {
  const {
    wrapper: { getByText, container },
  } = render();

  const emailInput = container.querySelector('input[type="text"]');
  fireEvent.change(emailInput, { target: { value: 'email' } });

  expect(getByText('extract_to_email.email_error')).toBeInTheDocument();
});

test('allows user to perform email extraction', () => {
  const {
    wrapper: { getByText, container },
    store,
  } = render();

  const emailInput = container.querySelector('input[type="text"]');
  fireEvent.change(emailInput, { target: { value: 'email@keen.io' } });

  const limitInput = container.querySelector('input[type="number"]');
  fireEvent.change(limitInput, { target: { value: 2000 } });

  const button = getByText('extract_to_email.button_label');
  fireEvent.click(button);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "contentEncoding": undefined,
          "contentType": "text/csv",
          "email": "email@keen.io",
          "latest": 2000,
        },
        "type": "queries/runEmailExtraction",
      },
    ]
  `);
});
