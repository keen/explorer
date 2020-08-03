import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import RelativeTimeLabel from './RelativeTimeLabel';
import text from './text.json';

const render = (overProps: any = {}) => {
  const props = {
    relativity: 'this',
    value: 14,
    units: 'days',
    ...overProps,
  };

  const wrapper = rtlRender(<RelativeTimeLabel {...props} />);

  return {
    props,
    wrapper,
  };
};

test('shows message about including current day in timeframe', () => {
  const {
    wrapper: { getByText },
  } = render();

  expect(getByText(text.todayIncludes)).toBeInTheDocument();
});

test('shows timeframe settings', () => {
  const {
    wrapper: { getByText },
  } = render({ units: 'weeks' });

  expect(getByText('Last 14 weeks')).toBeInTheDocument();
});

test('do not shows message about including current day in timeframe', () => {
  const {
    wrapper: { queryByText },
  } = render({ relativity: 'previous' });

  expect(queryByText(text.todayIncludes)).not.toBeInTheDocument();
});
