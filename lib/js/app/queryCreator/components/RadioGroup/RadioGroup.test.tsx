import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import RadioGroup from './RadioGroup';

const elements = [
  { label: 'Radio 1', value: 'radio-1' },
  { label: 'Radio 2', value: 'radio-2' },
  { label: 'Radio 3', value: 'radio-3' },
];

const render = (overProps: any = {}) => {
  const props = {
    onChange: jest.fn(),
    elements,
    name: 'test',
    ...overProps,
  };

  const wrapper = rtlRender(<RadioGroup {...props} />);

  return {
    props,
    wrapper,
  };
};

test('RadioGroup should be rendered', () => {
  const {
    wrapper: { getByTestId },
  } = render();
  const radioGroup = getByTestId('radio-group');

  expect(radioGroup).toBeInTheDocument();
});

test('should render provided numner of radios', () => {
  const {
    wrapper: { getAllByRole },
  } = render();
  const inputs = getAllByRole('radio');

  expect(inputs.length).toEqual(elements.length);
});

test('should call onChange', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();
  const radio = getByTestId('radio-1');
  fireEvent.click(radio);

  expect(props.onChange).toHaveBeenCalled();
});

test('should mark active radio', () => {
  const {
    wrapper: { getByTestId },
  } = render({ value: 'radio-2' });
  const radio = getByTestId('radio-2-active');

  expect(radio).toBeInTheDocument();
});
