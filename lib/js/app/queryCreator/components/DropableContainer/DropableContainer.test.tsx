import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import DropableContainer from './DropableContainer';

const render = (overProps: any = {}) => {
  const props = {
    onDefocus: jest.fn(),
    onClick: jest.fn(),
    isActive: false,
    ...overProps,
  };

  const wrapper = rtlRender(
    <div data-testid="outside-element">
      <DropableContainer {...props} />
    </div>
  );

  return {
    props,
    wrapper,
  };
};

test('calls "onClick" event handler', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const container = getByTestId('dropable-container');
  fireEvent.click(container);

  expect(props.onClick).toHaveBeenCalled();
});

test('calls "onDefocus" event handler', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render({ isActive: true });

  const element = getByTestId('outside-element');
  fireEvent.click(element);

  expect(props.onDefocus).toHaveBeenCalled();
});

test('renders children nodes', () => {
  const children = 'children';
  const {
    wrapper: { getByText },
  } = render({ value: 'extraction', children });

  const element = getByText(children);

  expect(element).toBeInTheDocument();
});

test('renders placeholder', () => {
  const placeholder = 'placeholder';
  const {
    wrapper: { getByText },
  } = render({ placeholder });

  const element = getByText(placeholder);

  expect(element).toBeInTheDocument();
});

test('renders search placeholder', () => {
  const searchPlaceholder = 'searchPlaceholder';
  const {
    wrapper: { getByPlaceholderText },
  } = render({ searchPlaceholder, searchable: true, isActive: true });

  const element = getByPlaceholderText(searchPlaceholder);

  expect(element).toBeInTheDocument();
});

test('renders drop indicator', () => {
  const {
    wrapper: { getByTestId },
  } = render({ dropIndicator: true });

  const element = getByTestId('drop-indicator');

  expect(element).toBeInTheDocument();
});

test('allows user to search', () => {
  const mockFn = jest.fn();
  const {
    wrapper: { getByTestId },
  } = render({
    searchable: true,
    isActive: true,
    onSearch: mockFn,
  });

  const input = getByTestId('dropable-container-input');
  fireEvent.change(input, { target: { value: 'industry' } });

  expect(mockFn).toHaveBeenCalled();
});
