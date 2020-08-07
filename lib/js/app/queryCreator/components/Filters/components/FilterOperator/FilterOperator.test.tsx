import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import FilterOperator from './FilterOperator';

const render = (overProps: any = {}) => {
  const props = {
    propertyType: 'String',
    operator: 'eq',
    onChange: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<FilterOperator {...props} />);

  return {
    wrapper,
    props,
  };
};

test('shows the operators list', () => {
  const {
    wrapper: { rerender, getByTestId },
    props,
  } = render();
  rerender(<FilterOperator property="user" {...props} />);

  expect(getByTestId('operators-list')).toBeInTheDocument();
});

test('allows user to select operator', () => {
  const {
    wrapper: { getByText, getByTestId },
    props,
  } = render({ propertyType: 'Number', operator: undefined });

  const container = getByTestId('dropable-container');
  fireEvent.click(container);

  const operatorElement = getByText('equals');
  fireEvent.click(operatorElement);

  expect(props.onChange).toHaveBeenCalledWith('eq');
});
