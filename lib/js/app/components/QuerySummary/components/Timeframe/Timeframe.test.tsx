import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import Timeframe from './Timeframe';

const render = (overProps: any = {}) => {
  const props = {
    timeframe: 'this_14_days',
    timezone: 'UTC',
    ...overProps,
  };

  const wrapper = rtlRender(<Timeframe {...props} />);

  return {
    wrapper,
    props,
  };
};

test('should render relative timeframe', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  const timeframe = getByText(props.timeframe);
  expect(timeframe).toBeInTheDocument();
});

test('should render absolute timeframe', () => {
  const {
    wrapper: { container },
  } = render({
    timeframe: { start: '2020-09-29T00:00:00Z', end: '2020-09-30T00:00:00Z' },
  });

  expect(container).toMatchSnapshot();
});
