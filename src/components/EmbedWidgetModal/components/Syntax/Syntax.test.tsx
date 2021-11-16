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

test('shows copy code button', () => {
  const {
    wrapper: { getByTestId, getByText },
  } = render();
  const codeBox = getByTestId('code');
  fireEvent.mouseOver(codeBox);
  const copyCodeBtn = getByText('embed_widget.copy');
  expect(copyCodeBtn).toBeInTheDocument();
});
