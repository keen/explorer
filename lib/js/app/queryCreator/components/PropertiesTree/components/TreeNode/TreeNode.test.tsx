import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import TreeNode from './TreeNode';

const render = (overProps: any = {}) => {
  const props = {
    name: 'name',
    isOpen: false,
    deepnessLevel: 0,
    onClick: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<TreeNode {...props} />);

  return {
    props,
    wrapper,
  };
};

test('renders node name', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();
  const element = getByText(props.name);

  expect(element).toBeInTheDocument();
});

test('calls "onClick" handler', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();
  const element = getByText(props.name);

  fireEvent.click(element);

  expect(props.onClick).toHaveBeenCalled();
});
