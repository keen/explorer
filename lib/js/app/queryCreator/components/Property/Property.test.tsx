import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import Property from './Property';

const render = (overProps: any = {}) => {
  const props = {
    ...overProps,
  };

  const wrapper = rtlRender(<Property {...props} />);

  return {
    wrapper,
    props,
  };
};

test('renders placeholder', () => {
  const placeholder = 'placeholder';
  const {
    wrapper: { getByText },
  } = render({
    placeholder,
  });

  expect(getByText(placeholder)).toBeInTheDocument();
});

test('renders property path', () => {
  const property = 'category.id';
  const {
    wrapper: { getByText },
  } = render({
    property,
  });

  expect(getByText('category')).toBeInTheDocument();
  expect(getByText('id')).toBeInTheDocument();
});

test('set default input value', () => {
  const property = 'category';
  const {
    wrapper: { getByTestId },
  } = render({
    editMode: true,
    property,
  });

  const input = getByTestId('property-input') as HTMLInputElement;

  expect(input.value).toEqual(property);
});

test('set default input placeholder', () => {
  const searchPlaceholder = 'searchPlaceholder';
  const {
    wrapper: { getByTestId },
  } = render({
    editMode: true,
    searchPlaceholder,
  });

  const input = getByTestId('property-input') as HTMLInputElement;

  expect(input.placeholder).toEqual(searchPlaceholder);
});

test('set property as input placeholder', () => {
  const property = 'category';
  const {
    wrapper: { getByTestId },
  } = render({
    editMode: true,
    property,
  });

  const input = getByTestId('property-input') as HTMLInputElement;

  expect(input.placeholder).toEqual(property);
});

test('calls "onEditBlur" handler', () => {
  const mockFn = jest.fn();
  const {
    wrapper: { getByTestId },
  } = render({
    onEditBlur: mockFn,
    editMode: true,
  });

  const input = getByTestId('property-input');
  fireEvent.blur(input);

  expect(mockFn).toHaveBeenCalled();
});

test('calls "onEditInputChange" handler', () => {
  const mockFn = jest.fn();
  const {
    wrapper: { getByTestId },
  } = render({
    onEditInputChange: mockFn,
    editMode: true,
  });

  const input = getByTestId('property-input');
  fireEvent.change(input, { target: { value: 'category' } });

  expect(mockFn).toHaveBeenCalled();
});
