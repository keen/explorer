import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import AutorunQuery from './AutorunQuery';

test('calls on "onToggle" event handler', () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(
    <AutorunQuery autorun={false} onToggle={mockFn} />
  );

  const element = getByTestId('toggle');
  fireEvent.click(element);

  expect(mockFn).toHaveBeenCalledWith(true);
});
