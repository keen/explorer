import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import ConfirmExtraction from './ConfirmExtraction';

const render = (overStoreState: any = {}) => {
  const mockStore = configureStore([]);
  const storeState = {
    queries: {
      extractionConfirmation: {
        isVisible: true,
      },
      ...overStoreState,
    },
  };

  const store = mockStore(storeState);

  const wrapper = rtlRender(
    <Provider store={store}>
      <ConfirmExtraction />
    </Provider>
  );

  return {
    store,
    wrapper,
  };
};

test('allows user to continue extraction', () => {
  const {
    wrapper: { getByText },
    store,
  } = render();

  const button = getByText('extraction_confirmation.confirm_button');
  fireEvent.click(button);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": undefined,
        "type": "queries/continueExtraction",
      },
    ]
  `);
});

test('allows user to cancel extraction', () => {
  const {
    wrapper: { getByText },
    store,
  } = render();

  const button = getByText('extraction_confirmation.cancel');
  fireEvent.click(button);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": undefined,
        "type": "queries/cancelExtraction",
      },
    ]
  `);
});

test('allows user to switch to email extraction', () => {
  const {
    wrapper: { getByText },
    store,
  } = render();

  const button = getByText('extraction_confirmation.extract_email_button');
  fireEvent.click(button);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": undefined,
        "type": "queries/cancelExtraction",
      },
      Object {
        "payload": undefined,
        "type": "queries/extractToEmail",
      },
    ]
  `);
});
