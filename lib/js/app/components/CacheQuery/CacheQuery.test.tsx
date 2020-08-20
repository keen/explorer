import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import CacheQuery from './CacheQuery';
import text from './text.json';

test('allows user to enable cache for query', () => {
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

test('do not allows user to enable cache with exceeded limits', () => {
  const mockFn = jest.fn();
  const { container } = render(
    <CacheQuery
      onCacheChange={mockFn}
      onRefreshRateChange={jest.fn()}
      isLimited={true}
      isCached={false}
    />
  );

  const checkbox = container.querySelector('input[type="checkbox"]');
  fireEvent.click(checkbox);

  expect(mockFn).not.toHaveBeenCalled();
});

test('shows cache limit reached information for not cached query', () => {
  const mockFn = jest.fn();
  render(
    <CacheQuery
      onCacheChange={mockFn}
      onRefreshRateChange={jest.fn()}
      isLimited={true}
      isCached={false}
    />
  );

  expect(screen.getByText(text.queriesLimit)).toBeInTheDocument();
});

test('renders refresh settings when caching is enabled', () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(
    <CacheQuery
      onCacheChange={mockFn}
      onRefreshRateChange={jest.fn()}
      isLimited={false}
      isCached={true}
    />
  );

  expect(getByTestId('cache-refresh-rate')).toBeInTheDocument();
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
  const settings = container.querySelector(
    '[data-testid="cache-refresh-rate"]'
  );

  expect(settings).not.toBeInTheDocument();
});
