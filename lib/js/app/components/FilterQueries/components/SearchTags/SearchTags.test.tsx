import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import SearchTags from './SearchTags';

const render = (overProps: any = {}) => {
  const props = {
    isActive: false,
    onActiveSearch: jest.fn(),
    onChangePhrase: jest.fn(),
    onClearPhrase: jest.fn(),
    searchPhrase: '',
    inputPlaceholder: 'inputPlaceholder',
    searchLabel: 'searchLabel',
    ...overProps,
  };

  const wrapper = rtlRender(<SearchTags {...props} />);

  return {
    wrapper,
    props,
  };
};

test('allows user to active search', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  const element = getByText(props.searchLabel);
  fireEvent.click(element);

  expect(props.onActiveSearch).toHaveBeenCalled();
});

test('allow user to perform search', () => {
  const {
    wrapper: { container },
    props,
  } = render({
    isActive: true,
  });

  const input = container.querySelector('input');
  fireEvent.change(input, { target: { value: 'tag' } });

  expect(props.onChangePhrase).toHaveBeenCalledWith('tag');
});

test('allow user to clear search phrase', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render({
    isActive: true,
  });

  const element = getByTestId('clear-search');
  fireEvent.click(element);

  expect(props.onClearPhrase).toHaveBeenCalled();
});
