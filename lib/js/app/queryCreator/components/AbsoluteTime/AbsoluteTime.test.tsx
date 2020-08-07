import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import 'jest-styled-components';

import AbsoluteTime from './AbsoluteTime';

const render = (overProps: any = {}) => {
  const props = {
    id: 'date',
    start: '2020-07-29T12:00:00Z',
    end: '2020-07-30T00:00:00Z',
    timezone: 'UTC',
    onChange: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<AbsoluteTime {...props} />);

  return {
    props,
    wrapper,
  };
};

test('renders date picker for timeframe start', () => {
  const {
    wrapper: { getByTestId },
  } = render();
  const container = getByTestId('date-start');

  expect(container).toMatchSnapshot();
});

test('renders date picker for timeframe end', () => {
  const {
    wrapper: { getByTestId },
  } = render();
  const container = getByTestId('date-end');

  expect(container).toMatchSnapshot();
});
