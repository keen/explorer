import React from 'react';
import { fireEvent, render as rtlRender } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import Syntax from './Syntax';

mockAllIsIntersecting(true);

const render = () => {
  const wrapper = rtlRender(<Syntax code={'<div></div>'} />);
  return {
    wrapper,
  };
};

test('not shows copy code button initially', () => {
  const {
    wrapper: { queryByText },
  } = render();
  const copyCodeBtn = queryByText('embed_widget.copy');
  expect(copyCodeBtn).not.toBeInTheDocument();
});

test('shows copy code button on hover', () => {
  const {
    wrapper: { getByTestId, getByText },
  } = render();
  const codeBox = getByTestId('code');
  fireEvent.mouseOver(codeBox);
  const copyCodeBtn = getByText('embed_widget.copy');
  expect(copyCodeBtn).toBeInTheDocument();
});
