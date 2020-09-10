import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import ActionsMenu from './ActionsMenu';
import text from './text.json';

const render = (overProps: any = {}) => {
  const props = {
    isNewQuery: false,
    onRemoveQuery: jest.fn(),
    ...overProps,
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

test("doesn't allow to remove new query", () => {
  const {
    wrapper: { queryByText },
  } = render({ isNewQuery: true });

  const removeLink = queryByText(text.deleteQuery);

  expect(removeLink).toBeNull();
});
