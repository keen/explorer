import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import ActionsMenu from './ActionsMenu';
import text from './text.json';

const render = () => {
  const props = {
    onRemoveQuery: jest.fn(),
  };

  const wrapper = rtlRender(<ActionsMenu {...props} />);

  return {
    props,
    wrapper,
  };
};

test('shows ActionsMenu', () => {
  const {
    wrapper: { container },
  } = render();

  expect(container).toBeInTheDocument();
});

test('allows user to remove query', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  const removeLink = getByText(text.deleteQuery);
  fireEvent.click(removeLink);

  expect(props.onRemoveQuery).toHaveBeenCalled();
});
