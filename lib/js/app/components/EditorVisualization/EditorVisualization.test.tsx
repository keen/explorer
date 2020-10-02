import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import EditorVisualization from './EditorVisualization';

const createWidgetSelector = (widgetType: string) =>
  `[data-testid="${widgetType}-widget-container"] [data-testid="widget-item"]`;

const render = (storeState: any = {}, overProps: any = {}) => {
  const mockStore = configureStore([]);
  const state = {
    app: {
      visualization: {
        type: 'json',
        chartSettings: {},
        widgetSettings: {},
      },
    },
    ...storeState,
  };

  const store = mockStore({ ...state });

  const props = {
    query: {},
    queryResults: {
      result: 0,
    },
    ...overProps,
  };

  const wrapper = rtlRender(
    <Provider store={store}>
      <EditorVisualization {...props} />
    </Provider>
  );

  return {
    store,
    props,
    wrapper,
  };
};

test('renders query visualization as json', () => {
  const {
    wrapper: { getByTestId },
  } = render();
  const jsonTree = getByTestId('json-tree');

  expect(jsonTree).toBeInTheDocument();
});

test('allows user to change visualization', () => {
  const {
    wrapper: { container },
    store,
  } = render();
  const widgetItem = container.querySelector(createWidgetSelector('metric'));
  fireEvent.click(widgetItem);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "chartSettings": Object {
            "type": "simple",
          },
          "type": "metric",
          "widgetSettings": Object {},
        },
        "type": "@app/SET_VISUALIZATION",
      },
    ]
  `);
});
