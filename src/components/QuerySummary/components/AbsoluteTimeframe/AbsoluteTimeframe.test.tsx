import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import AbsoluteTimeframe from './AbsoluteTimeframe';

const render = (overProps: any = {}) => {
  const props = {
    timezone: 'UTC',
    timeframe: {
      start: '2020-09-29T00:00:00Z',
      end: '2020-09-30T00:00:00Z',
    },
    ...overProps,
  };

  const wrapper = rtlRender(<AbsoluteTimeframe {...props} />);

  return {
    wrapper,
    props,
  };
};

test('renders timeframe with "UTC" timezone conversion', () => {
  const {
    wrapper: { getByText },
  } = render();

  const from = getByText('2020-09-29 00:00');
  const to = getByText('2020-09-30 00:00');

  expect(from).toBeInTheDocument();
  expect(to).toBeInTheDocument();
});

test('renders raw date ranges for timezone offset', () => {
  const {
    wrapper: { getByText },
    props: { timeframe },
  } = render({ timezone: 3600 });

  expect(getByText(timeframe.start)).toBeInTheDocument();
  expect(getByText(timeframe.end)).toBeInTheDocument();
});
