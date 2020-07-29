import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import Analysis from './Analysis';

import { KEYBOARD_KEYS } from '../../constants';

const render = (overProps: any = {}) => {
  const props = {
    onChange: jest.fn(),
    analysis: 'count',
    ...overProps,
  };

  const wrapper = rtlRender(<Analysis {...props} />);

  return {
    props,
    wrapper,
  };
};

test('allows user to select analysis type', () => {
  const {
    wrapper: { getByTestId, getByText },
    props,
  } = render();

  const field = getByTestId('dropable-container');
  fireEvent.click(field);

  const element = getByText('Count Unique');
  fireEvent.click(element);

  expect(props.onChange).toHaveBeenCalledWith('count_unique');
});

test('allows user to select analysis by using keyboard', async () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render({ analysis: 'average' });

  const field = getByTestId('dropable-container');

  fireEvent.click(field);
  fireEvent.keyDown(field, { keyCode: KEYBOARD_KEYS.DOWN });
  fireEvent.keyDown(field, { keyCode: KEYBOARD_KEYS.ENTER });

  expect(props.onChange).toHaveBeenCalledWith('count');
});

test('shows hint message for analysis', () => {
  const {
    wrapper: { getByTestId, getByText },
  } = render();

  const field = getByTestId('dropable-container');
  fireEvent.click(field);

  const element = getByText('Count Unique');
  fireEvent.mouseOver(element);

  const hintIcon = getByTestId('hint-icon');
  fireEvent.mouseOver(hintIcon);

  expect(getByTestId('hint-message')).toBeInTheDocument();
});
