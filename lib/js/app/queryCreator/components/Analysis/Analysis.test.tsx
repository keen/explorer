import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import Analysis from './Analysis';

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
