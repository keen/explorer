import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { KeenDataviz } from '@keen.io/dataviz';

import QueryVisualization from './QueryVisualization';
import { AppContext } from '../../contexts';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const renderMock = jest.fn();
const destroyMock = jest.fn();

jest.mock('@keen.io/dataviz', () => {
  return {
    KeenDataviz: jest.fn().mockImplementation(() => {
      return { render: renderMock, destroy: destroyMock };
    }),
  };
});

const render = (overProps: any = {}, overStore: any = {}) => {
  const props = {
    widgetType: 'bar',
    queryResults: {
      query: {
        timeframe: 'this_14_days',
        timezone: 'America/New_York',
      },
      result: 20,
    },
    chartSettings: {
      theme: {
        gridX: {
          enabled: true,
        },
      },
    },
    widgetSettings: {},
    ...overProps,
  };
  const context = {
    datavizSettings: {
      theme: {
        gridX: { enabled: true },
        gridY: { enabled: true },
      },
    },
  };

  const mockStore = configureStore([]);

  const store = mockStore({
    app: {
      view: 'editor',
    },
    ...overStore,
  });

  const wrapper = rtlRender(
    <Provider store={store}>
      <AppContext.Provider value={context as any}>
        <QueryVisualization {...props} />
      </AppContext.Provider>
    </Provider>
  );

  return {
    wrapper,
    props,
  };
};

beforeEach(() => {
  (KeenDataviz as any).mockClear();
  renderMock.mockClear();
});

test('initializes "DataViz" instance with named timezone', () => {
  render();

  expect(KeenDataviz).toHaveBeenCalledWith(
    expect.objectContaining({
      type: 'bar',
      presentationTimezone: 'America/New_York',
    })
  );
});

test('initializes "DataViz" instance and set "null" as presentation timezone', () => {
  const props = {
    queryResults: {
      result: 20,
    },
  };

  render(props);

  expect(KeenDataviz).toHaveBeenCalledWith(
    expect.objectContaining({
      type: 'bar',
      presentationTimezone: null,
    })
  );
});

test('renders "JSON" tree', () => {
  const {
    wrapper: { getByTestId },
  } = render({
    widgetType: 'json',
  });

  expect(getByTestId('json-tree')).toBeInTheDocument();
});

test('renders gauge chart message when min value is not provided and is in edit view', () => {
  const {
    wrapper: { getByTestId },
  } = render({
    widgetType: 'gauge',
  });

  expect(getByTestId('gauge-chart-message')).toBeInTheDocument();
});

test('not renders gauge chart message when is in browser view', () => {
  const {
    wrapper: { queryByTestId },
  } = render(
    {
      widgetType: 'gauge',
    },
    { app: { view: 'browser' } }
  );

  expect(queryByTestId('gauge-chart-message')).not.toBeInTheDocument();
});

test('not renders gauge chart message when maxValue is set', () => {
  const {
    wrapper: { queryByTestId },
  } = render({
    widgetType: 'gauge',
    chartSettings: {
      maxValue: 100,
    },
  });

  expect(queryByTestId('gauge-chart-message')).not.toBeInTheDocument();
});
