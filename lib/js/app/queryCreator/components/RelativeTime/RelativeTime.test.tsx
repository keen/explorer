import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import RelativeTime from './RelativeTime';
import text from './text.json';

const render = (overProps: any = {}) => {
  const props = {
    relativity: 'this',
    value: 14,
    units: 'days',
    onChange: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<RelativeTime {...props} />);

  return {
    props,
    wrapper,
  };
};

test('allows user to include the current day in timeframe', () => {
  const {
    props,
    wrapper: { getByText },
  } = render({ relativity: 'previous' });

  const checkbox = getByText(text.relativityTitle);
  fireEvent.click(checkbox);

  expect(props.onChange).toHaveBeenCalledWith('this_14_days');
});

test('allows user to exclude the current day from timeframe', () => {
  const {
    props,
    wrapper: { getByText },
  } = render();

  const checkbox = getByText(text.relativityTitle);
  fireEvent.click(checkbox);

  expect(props.onChange).toHaveBeenCalledWith('previous_14_days');
});
