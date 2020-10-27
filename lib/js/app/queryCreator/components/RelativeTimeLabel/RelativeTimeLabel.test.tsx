import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import RelativeTimeLabel from './RelativeTimeLabel';

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

  expect(
    getByText('query_creator_relative_time_label.today_includes')
  ).toBeInTheDocument();
});

test('shows message about including current interval in timeframe', () => {
  const {
    wrapper: { getByText },
  } = render({ units: 'years' });

  expect(
    getByText('(query_creator_relative_time_label.relativity_title year)')
  ).toBeInTheDocument();
});

test('shows timeframe settings', () => {
  const {
    wrapper: { getByText },
  } = render({ units: 'weeks' });

  expect(
    getByText('query_creator_relative_time_label.label 14 weeks')
  ).toBeInTheDocument();
});

test('do not shows message about including current day in timeframe', () => {
  const {
    wrapper: { queryByText },
  } = render({ relativity: 'previous' });

  expect(
    queryByText('query_creator_relative_time_label.today_includes')
  ).not.toBeInTheDocument();
});
