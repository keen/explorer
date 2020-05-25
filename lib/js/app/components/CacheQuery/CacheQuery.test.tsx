import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import CacheQuery from './CacheQuery';

test('calls "onCacheChange" handler', () => {
  const mockFn = jest.fn();
  const { container } = render(
    <CacheQuery
      onCacheChange={mockFn}
      onRefreshRateChange={jest.fn()}
      isLimited={false}
      isCached={false}
    />
  );

  const checkbox = container.querySelector('input[type="checkbox"]');
  fireEvent.click(checkbox);

  expect(mockFn).toHaveBeenCalled();
});

test('shows refresh settings when caching is enabled', () => {
  const mockFn = jest.fn();
  const { container } = render(
    <CacheQuery
      onCacheChange={mockFn}
      onRefreshRateChange={jest.fn()}
      isLimited={false}
      isCached={true}
    />
  );
  const settings = container.querySelector('[data-test="refresh-settings"]');

  expect(settings).toBeInTheDocument();
});

test('refresh settings is not visible for disabled caching', () => {
  const mockFn = jest.fn();
  const { container } = render(
    <CacheQuery
      onCacheChange={mockFn}
      onRefreshRateChange={jest.fn()}
      isLimited={false}
      isCached={false}
    />
  );
  const settings = container.querySelector('[data-test="refresh-settings"]');

  expect(settings).not.toBeInTheDocument();
});
