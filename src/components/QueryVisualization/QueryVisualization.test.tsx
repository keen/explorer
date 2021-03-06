import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { KeenDataviz } from '@keen.io/dataviz';

import QueryVisualization from './QueryVisualization';

const renderMock = jest.fn();

jest.mock('@keen.io/dataviz', () => {
  return {
    KeenDataviz: jest.fn().mockImplementation(() => {
      return { render: renderMock };
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
    chartSettings: {},
    widgetSettings: {},
    ...overProps,
  };

  const wrapper = rtlRender(<QueryVisualization {...props} />);

  return {
    wrapper,
    props,
  };
};

beforeEach(() => {
  (KeenDataviz as any).mockClear();
  renderMock.mockClear();
});

test('initializes "DataViz" instance and extracts timezone offset', () => {
  const props = {
    queryResults: {
      query: {
        timeframe: {
          start: '2021-03-14T16:00:00+03:00',
          end: '2021-03-14T17:00:00+03:00',
        },
      },
      result: 20,
    },
  };

  render(props);

  expect(KeenDataviz).toHaveBeenCalledWith(
    expect.objectContaining({
      type: 'bar',
      presentationTimezone: 180,
    })
  );
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
