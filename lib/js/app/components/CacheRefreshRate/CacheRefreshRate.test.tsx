import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import CacheRefreshRate from './CacheRefreshRate';

test('allows user to set cache refresh rate', () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(
    <CacheRefreshRate
      refreshRate={4}
      minimumRate={4}
      maximumRate={48}
      onChange={mockFn}
    />
  );

  const input = getByTestId('refresh-rate-input');
  fireEvent.change(input, { target: { value: 8 } });

  expect(mockFn).toHaveBeenCalledWith(8);
});

test('renders hint after providing value above the maximum limit', () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(
    <CacheRefreshRate
      refreshRate={50}
      minimumRate={4}
      maximumRate={48}
      onChange={mockFn}
    />
  );

  const input = getByTestId('refresh-rate-input');
  fireEvent.blur(input);

  const hint = getByTestId('refresh-rate-hint');

  expect(hint).toBeInTheDocument();
});

test('renders hint after providing value below the minimum limit', () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(
    <CacheRefreshRate
      refreshRate={2}
      minimumRate={4}
      maximumRate={48}
      onChange={mockFn}
    />
  );

  const input = getByTestId('refresh-rate-input');
  fireEvent.blur(input);

  const hint = getByTestId('refresh-rate-hint');

  expect(hint).toBeInTheDocument();
});
