import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import FunnelSteps from './FunnelSteps';

jest.mock('uuid', () => {
  return {
    v4: jest.fn(() => 'id'),
  };
});

const render = (storeState: any = {}) => {
  const mockStore = configureStore([]);
  const state = {
    query: {
      steps: [],
    },
    ...storeState,
  };

  const store = mockStore({ ...state });

  const wrapper = rtlRender(
    <Provider store={store}>
      <FunnelSteps />
    </Provider>
  );

  return {
    store,
    wrapper,
  };
};

test('allows user to add funnel step', () => {
  const {
    wrapper: { getByTestId },
    store,
  } = render();

  const button = getByTestId('add-step-button');
  fireEvent.click(button);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "id": "id",
        },
        "type": "@query-creator/ADD_FUNNEL_STEP",
      },
    ]
  `);
});

test('resets funnel steps', () => {
  const {
    wrapper: { unmount },
    store,
  } = render();
  unmount();

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "steps": Array [],
        },
        "type": "@query-creator/SET_FUNNEL_STEPS",
      },
    ]
  `);
});
