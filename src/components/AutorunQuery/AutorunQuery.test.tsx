import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import AutorunQuery from './AutorunQuery';

test('calls on "onToggle" event handler', () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(
    <AutorunQuery
      autorun={false}
      onToggle={mockFn}
      tooltipMessage="tooltipMessage"
      label="label"
    />
  );

  const element = getByTestId('toggle');
  fireEvent.click(element);

  expect(mockFn).toHaveBeenCalledWith(true);
});

test('shows tooltip with hint message', () => {
  const mockFn = jest.fn();
  const tooltipMessage = 'tooltipMessage';
  const { getByTestId, getByText } = render(
    <AutorunQuery
      autorun={false}
      onToggle={mockFn}
      tooltipMessage={tooltipMessage}
      label="label"
    />
  );

  const element = getByTestId('hint-container');
  fireEvent.mouseEnter(element);

  expect(getByText(tooltipMessage)).toBeInTheDocument();
});
