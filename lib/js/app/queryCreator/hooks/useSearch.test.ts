import { renderHook, act } from '@testing-library/react-hooks';

import { useSearch } from './useSearch';

const collection = [
  { label: 'Category', value: 'category' },
  { label: 'Name', value: 'name' },
];

jest.useFakeTimers();

test('calls "callback" handler with search results', () => {
  const mockFn = jest.fn();
  const searchPhrase = 'category';

  const { result } = renderHook(() => useSearch(collection, mockFn));
  const searchEvent = {
    currentTarget: {
      value: searchPhrase,
    },
  } as React.ChangeEvent<HTMLInputElement>;

  act(() => {
    result.current.searchHandler(searchEvent);
    jest.runAllTimers();
  });

  expect(mockFn).toHaveBeenCalledWith(
    [{ label: 'Category', value: 'category' }],
    searchPhrase
  );
});

test('returns search phrase', () => {
  const mockFn = jest.fn();
  const searchPhrase = 'Name';

  const { result } = renderHook(() => useSearch(collection, mockFn));
  const searchEvent = {
    currentTarget: {
      value: searchPhrase,
    },
  } as React.ChangeEvent<HTMLInputElement>;

  act(() => {
    result.current.searchHandler(searchEvent);
    jest.runAllTimers();
  });

  expect(result.current.searchPhrase).toEqual(searchPhrase);
});

test('clears search phrase', () => {
  const mockFn = jest.fn();
  const searchPhrase = 'Name';

  const { result } = renderHook(() => useSearch(collection, mockFn));
  const searchEvent = {
    currentTarget: {
      value: searchPhrase,
    },
  } as React.ChangeEvent<HTMLInputElement>;

  act(() => {
    result.current.searchHandler(searchEvent);
    jest.runAllTimers();

    result.current.clearSearchPhrase();
  });

  expect(result.current.searchPhrase).toBeNull();
});
