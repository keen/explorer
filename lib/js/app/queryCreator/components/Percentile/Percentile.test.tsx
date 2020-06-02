import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Percentile from './Percentile';

import { MAX_PERCENTILE } from './constants';

test('set input value based on percentile', () => {
  const { container } = render(
    <Percentile onChange={jest.fn()} onReset={jest.fn()} value={75} />
  );

  const input = container.querySelector(
    'input[type="number"]'
  ) as HTMLInputElement;

  expect(input.value).toBe('75');
});

test('calls "onChange" handler with percentile value', () => {
  const mockFn = jest.fn();
  const { container } = render(
    <Percentile onChange={mockFn} onReset={jest.fn()} value={10} />
  );

  const input = container.querySelector('input[type="number"]');
  fireEvent.change(input, { target: { value: 80 } });

  expect(mockFn).toHaveBeenCalledWith(80);
});

test('calls "onChange" handler with maximum percentile value', () => {
  const mockFn = jest.fn();
  const { container } = render(
    <Percentile onChange={mockFn} onReset={jest.fn()} value={10} />
  );

  const input = container.querySelector('input[type="number"]');
  fireEvent.change(input, { target: { value: 200 } });

  expect(mockFn).toHaveBeenCalledWith(MAX_PERCENTILE);
});

test('calls "onReset" handler', () => {
  const mockFn = jest.fn();
  const { container } = render(
    <Percentile onChange={jest.fn()} onReset={mockFn} value={10} />
  );

  const input = container.querySelector('input[type="number"]');
  fireEvent.change(input, { target: { value: '' } });

  expect(mockFn).toHaveBeenCalled();
});
