import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import DirectionList from './DirectionList';

const render = (overProps: any = {}) => {
  const props = {
    direction: 'ASC',
    ...overProps,
  };

  const wrapper = rtlRender(<DirectionList {...props} />);

  return {
    wrapper,
    props,
  };
};

test('renders selected option', () => {
  const {
    wrapper: { getByText },
  } = render();
  const label = getByText('ASC');

  expect(label).toBeInTheDocument();
});

test('allows user to select property', () => {
  const onChange = jest.fn();
  const {
    wrapper: { getByText, getByTestId },
  } = render({ onChange });

  const dropableContainer = getByTestId('dropable-container');
  fireEvent.click(dropableContainer);

  const option = getByText('DESC');
  fireEvent.click(option);

  expect(onChange).toHaveBeenCalledWith('DESC');
});
