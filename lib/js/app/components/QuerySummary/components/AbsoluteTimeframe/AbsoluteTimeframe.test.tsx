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

test('renders <AbsoluteTimeframe /> component', () => {
  const {
    wrapper: { getByText },
  } = render();

  const from = getByText('2020-09-29 00:00');
  const to = getByText('2020-09-30 00:00');

  expect(from).toBeInTheDocument();
  expect(to).toBeInTheDocument();
});

test('renders <AbsoluteTimeframe /> component when timezone as number provided', () => {
  const {
    wrapper: { getByText },
  } = render({ timezone: 3600 });

  const from = getByText('2020-09-29 02:00');
  const to = getByText('2020-09-30 02:00');

  expect(from).toBeInTheDocument();
  expect(to).toBeInTheDocument();
});
