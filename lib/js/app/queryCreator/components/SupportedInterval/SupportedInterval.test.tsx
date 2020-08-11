import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import SupportedInterval from './SupportedInterval';

test('allows user to select interval', async () => {
  const mockFn = jest.fn();
  const interval = 'monthly';

  const { getByText } = render(
    <SupportedInterval interval={undefined} onChange={mockFn} />
  );

  const monthlyElement = getByText(interval);

  fireEvent.click(monthlyElement);

  expect(mockFn).toHaveBeenCalledWith(interval);
});
