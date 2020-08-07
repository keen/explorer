import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import FilterListValue from './FilterListValue';
import { KEYBOARD_KEYS } from '../../../../constants';

const render = (overProps: any = {}) => {
  const props = {
    onChange: jest.fn(),
    items: [],
    ...overProps,
  };

  const wrapper = rtlRender(<FilterListValue {...props} />);

  return {
    wrapper,
    props,
  };
};

test('renders the current value', () => {
  const items = ['category', 1];
  const {
    wrapper: { getByText },
  } = render({ items });

  expect(getByText('category, 1')).toBeInTheDocument();
});

test('allows user to add value to the list', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const container = getByTestId('dropable-container');
  fireEvent.click(container);

  const input = getByTestId('list-input');
  fireEvent.keyPress(input, {
    keyCode: KEYBOARD_KEYS.ENTER,
    target: { value: 'category' },
  });

  expect(props.onChange).toHaveBeenCalledWith(['category']);
});

test('do not allows user to add already existing value to the list', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render({
    items: ['id'],
  });

  const container = getByTestId('dropable-container');
  fireEvent.click(container);

  const input = getByTestId('list-input');
  fireEvent.keyPress(input, {
    keyCode: KEYBOARD_KEYS.ENTER,
    target: { value: 'id' },
  });

  expect(props.onChange).not.toHaveBeenCalledWith();
});

test('allows user to remove value from the list', () => {
  const {
    wrapper: { getByTestId, getAllByTestId },
    props,
  } = render({
    items: ['id', 'category'],
  });

  const container = getByTestId('dropable-container');
  fireEvent.click(container);

  const [removeButton] = getAllByTestId('action-button');
  fireEvent.click(removeButton);

  expect(props.onChange).toHaveBeenCalledWith(['category']);
});
