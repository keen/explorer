import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import PropertyTreeItem from './PropertyTreeItem';

const render = (overProps: any = {}) => {
  const props = {
    onClick: jest.fn(),
    type: 'datetime',
    padding: 15,
    propertyName: 'clicks',
    propertyPath: 'users.cliks',
    ...overProps,
  };

  const wrapper = rtlRender(<PropertyTreeItem {...props} />);

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

  expect(getByText(props.type)).toBeInTheDocument();
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
