import React from 'react';
import { render } from '@testing-library/react';
import { PickerWidgets } from '@keen.io/widget-picker';
import { KeenDataviz } from '@keen.io/dataviz';

import DataViz from './Dataviz';

import { DEFAULT_WIDGET_SETTINGS } from './constants';

const renderMock = jest.fn();
const errorMock = jest.fn();

jest.mock('@keen.io/dataviz', () => {
  return {
    KeenDataviz: jest.fn().mockImplementation(() => {
      return { render: renderMock, error: errorMock };
    }),
  };
});

const initialProps = {
  visualization: 'bar' as Exclude<PickerWidgets, 'json'>,
  analysisResults: {
    query: {},
    result: 20,
  },
  chartSettings: {},
  widgetSettings: {},
};

beforeEach(() => {
  (KeenDataviz as any).mockClear();
  renderMock.mockClear();
});

test('creates "DataViz" instance', () => {
  render(<DataViz {...initialProps} />);

  expect(KeenDataviz).toHaveBeenCalledTimes(1);
});

test('initializes "DataViz" instance with named timezone settings', () => {
  const timezone = 'America/New_York';
  render(<DataViz {...initialProps} presentationTimezone={timezone} />);

  expect(KeenDataviz).toHaveBeenCalledWith(
    expect.objectContaining({
      type: 'bar',
      presentationTimezone: timezone,
      widget: {
        ...DEFAULT_WIDGET_SETTINGS,
      },
    })
  );
});

test('initializes "DataViz" instance with theme settings', () => {
  const theme = { colors: ['red', 'green'] };
  render(<DataViz {...initialProps} visualizationTheme={theme as any} />);

  expect(KeenDataviz).toHaveBeenCalledWith(
    expect.objectContaining({
      type: 'bar',
      settings: {
        theme,
      },
      widget: {
        ...DEFAULT_WIDGET_SETTINGS,
      },
    })
  );
});

test('calls "DataViz" render method with analysis results', () => {
  render(<DataViz {...initialProps} />);

  expect(renderMock).toHaveBeenCalledWith(initialProps.analysisResults);
});

test('calls "DataViz" error method when analysis results are empty', () => {
  const props = {
    ...initialProps,
    analysisResults: {
      query: {},
      result: [],
    },
  };
  render(<DataViz {...props} />);

  expect(errorMock).toHaveBeenCalledWith('dataviz.no_results');
});
