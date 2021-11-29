/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import { Query } from '@keen.io/query';

import Visualization from './Visualization';

const createWidgetSelector = (widgetType: string) =>
  `[data-testid="${widgetType}-widget-container"] [data-testid="widget-item"]`;

const render = (overProps: any = {}) => {
  const props = {
    onChangeVisualization: jest.fn(),
    query: {},
    widgetType: 'json',
    chartSettings: {},
    widgetSettings: {},
    queryResults: {
      result: 0,
    },
    ...overProps,
  };

  const mockStore = configureStore([]);
  const store = mockStore({
    app: {
      view: 'editor',
    },
  });

  const wrapper = rtlRender(
    <Provider store={store}>
      <Visualization {...props} />
    </Provider>
  );

  return {
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
    props,
  } = render();
  const widgetItem = container.querySelector(createWidgetSelector('metric'));
  fireEvent.click(widgetItem);

  expect(props.onChangeVisualization).toHaveBeenCalledWith({
    widgetType: 'metric',
    chartSettings: {
      type: 'simple',
    },
    widgetSettings: {},
  });
});

test('fallbacks to default visualization when current widget is detached from query', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'logins',
    timeframe: 'last_14_days',
  };

  const { props } = render({
    widgetType: 'area',
    query,
  });

  expect(props.onChangeVisualization).toHaveBeenCalledWith({
    widgetType: 'metric',
    chartSettings: {
      type: 'simple',
    },
    widgetSettings: {},
  });
});
