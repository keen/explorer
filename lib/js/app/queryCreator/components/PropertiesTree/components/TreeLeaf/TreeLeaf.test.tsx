import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import TreeLeaf from './TreeLeaf';

const render = (overProps: any = {}) => {
  const props = {
    onClick: jest.fn(),
    propertyType: 'datetime',
    deepnessLevel: 1,
    propertyName: 'clicks',
    propertyPath: 'users.cliks',
    ...overProps,
  };

  const wrapper = rtlRender(<TreeLeaf {...props} />);

  return {
    props,
    wrapper,
  };
};

test('shows the property type', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  expect(getByText(props.propertyType)).toBeInTheDocument();
});

test('allows user to select property', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  const element = getByText(props.propertyName);
  fireEvent.click(element);

  expect(props.onClick.mock.calls[0][1]).toEqual(props.propertyPath);
});
