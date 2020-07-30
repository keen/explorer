import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import Timezone from './Timezone';

const render = (overProps: any = {}) => {
  const props = {
    timezone: 'UTC',
    onChange: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<Timezone {...props} />);

  return {
    props,
    wrapper,
  };
};

test('shows the current timezone', () => {
  const {
    props,
    wrapper: { getByText },
  } = render();

  expect(getByText(props.timezone)).toBeInTheDocument();
});

test('allows user to select timezone', () => {
  const {
    props,
    wrapper: { getByTestId, getByText },
  } = render();

  const field = getByTestId('dropable-container');
  fireEvent.click(field);

  const element = getByText('Europe/London');
  fireEvent.click(element);

  expect(props.onChange).toHaveBeenCalledWith('Europe/London');
});
