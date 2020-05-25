import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import CacheQuery from './CacheQuery';
import text from './text.json';

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

test('shows cache limit reached information', () => {
  const mockFn = jest.fn();
  render(
    <CacheQuery
      onCacheChange={mockFn}
      onRefreshRateChange={jest.fn()}
      isLimited={true}
      isCached={true}
    />
  );

  expect(screen.getByText('Cached queries limit')).toBeInTheDocument();
});

test('shows tooltip with cache limit information', () => {
  const mockFn = jest.fn();
  const { container } = render(
    <CacheQuery
      onCacheChange={mockFn}
      onRefreshRateChange={jest.fn()}
      isLimited={true}
      isCached={true}
    />
  );

  const cacheInformation = container.querySelector('[data-test="cache-limit"]');
  fireEvent.mouseEnter(cacheInformation);

  expect(screen.getByText(text.limitReachedMessage)).toBeInTheDocument();
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
