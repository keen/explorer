import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { KeenDataviz } from '@keen.io/dataviz';

import QueryVisualization from './QueryVisualization';
import { AppContext } from '../../contexts';

const renderMock = jest.fn();
const destroyMock = jest.fn();

jest.mock('@keen.io/dataviz', () => {
  return {
    KeenDataviz: jest.fn().mockImplementation(() => {
      return { render: renderMock, destroy: destroyMock };
    }),
  };
});

const render = (overProps: any = {}) => {
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

  const wrapper = rtlRender(
    <AppContext.Provider value={context as any}>
      <QueryVisualization {...props} />
    </AppContext.Provider>
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
