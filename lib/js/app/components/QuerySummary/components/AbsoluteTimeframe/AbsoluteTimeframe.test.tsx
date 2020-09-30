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
    wrapper: { container },
  } = render();

  expect(container).toMatchSnapshot();
});

test('renders <AbsoluteTimeframe /> component when timezone as number provided', () => {
  const {
    wrapper: { container },
  } = render({ timezone: 0 });

  expect(container).toMatchSnapshot();
});
