import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import SearchQueries from './SearchQueries';

jest.useFakeTimers();

test('calls "onSearch" handler and debounce multiple change event', () => {
  const mockFn = jest.fn();
  const { container } = render(<SearchQueries onSearch={mockFn} />);

  const input = container.querySelector('input');
  fireEvent.change(input, { target: { value: 'mar' } });
  fireEvent.change(input, { target: { value: 'Marketing' } });

  jest.runAllTimers();

  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(mockFn).toHaveBeenCalledWith('marketing');
});

test('allows user to clear search phrase', () => {
  const mockFn = jest.fn();
  const { getByTestId, container } = render(
    <SearchQueries onSearch={mockFn} />
  );

  const input = container.querySelector('input');
  fireEvent.change(input, { target: { value: 'mar' } });

  const element = getByTestId('clear-search');
  fireEvent.click(element);

  jest.runAllTimers();

  expect(mockFn).toHaveBeenCalledWith('');
});
