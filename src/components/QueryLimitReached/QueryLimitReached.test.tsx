import React from 'react';
import { render } from '@testing-library/react';

import QueryLimitReached from './QueryLimitReached';

test('renders exceed query limit message', () => {
  const { queryByText } = render(<QueryLimitReached />);
  const title = queryByText('query_limit_reached.title');
  const firstLine = queryByText('query_limit_reached.main_message');
  const secondLine = queryByText('query_limit_reached.secondary_message');

  expect(title).toBeInTheDocument();
  expect(firstLine).toBeInTheDocument();
  expect(secondLine).toBeInTheDocument();
});

test('renders upgrade subscription anchor', () => {
  const { queryByText } = render(
    <QueryLimitReached upgradeSubscriptionUrl="http://test.keen.io" />
  );
  const title = queryByText('query_limit_reached.title');
  const firstLine = queryByText('query_limit_reached.main_message');
  const secondLine = queryByText('query_limit_reached.secondary_message');

  expect(title).toBeInTheDocument();
  expect(firstLine).toBeNull();
  expect(secondLine).toBeInTheDocument();
});
