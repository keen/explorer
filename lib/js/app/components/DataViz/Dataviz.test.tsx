import React from 'react';
import { render } from '@testing-library/react';
import { PickerWidgets } from '@keen.io/widget-picker';
import { KeenDataviz } from '@keen.io/dataviz';

import DataViz from './Dataviz';
import text from './text.json';

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

test('creates KeenDataviz instance', () => {
  render(<DataViz {...initialProps} />);

  expect(KeenDataviz).toHaveBeenCalledTimes(1);
});

test('calls KeenDataviz render method with analysis results', () => {
  render(<DataViz {...initialProps} />);

  expect(renderMock).toHaveBeenCalledWith(initialProps.analysisResults);
});

test('calls KeenDataviz error method', () => {
  const props = {
    ...initialProps,
    analysisResults: {
      query: {},
      result: [],
    },
  };
  render(<DataViz {...props} />);

  expect(errorMock).toHaveBeenCalledWith(text.noResults);
});
