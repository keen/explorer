import React from 'react';
import { render } from '@testing-library/react';

import QueryLimitReached from './QueryLimitReached';

import text from './text.json';

test('render QueryLimitReached component', () => {
  const { queryByText } =render(<QueryLimitReached/>);
  const title = queryByText(text.title);
  const firstLine = queryByText(text.first_line);
  const secondLine = queryByText(text.second_line);
  expect(title).toBeInTheDocument();
  expect(firstLine).toBeInTheDocument();
  expect(secondLine).toBeInTheDocument();
});

test('render QueryLimitReached component with upgradeSubscriptionUrl', () => {
  const { queryByText } =render(<QueryLimitReached upgradeSubscriptionUrl='test' />);
  const title = queryByText(text.title);
  const firstLine = queryByText(text.first_line);
  const secondLine = queryByText(text.second_line);
  expect(title).toBeInTheDocument();
  expect(firstLine).toBeNull();
  expect(secondLine).toBeInTheDocument();
});
