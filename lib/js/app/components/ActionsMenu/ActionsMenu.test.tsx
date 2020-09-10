import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import ActionsMenu from './ActionsMenu';
import text from './text.json';

const render = (overProps: any = {}) => {
  const props = {
    isNewQuery: false,
    onRemoveQuery: jest.fn(),
    onShareQuery: jest.fn(),
    ...overProps,
  };

  const mockStore = configureStore([]);
  const store = mockStore({});

  const wrapper = rtlRender(
    <Provider store={store}>
      <ActionsMenu {...props} />
    </Provider>
  );

  return {
    props,
    store,
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

<<<<<<< HEAD
test("doesn't allow to remove new query", () => {
  const {
    wrapper: { queryByText },
  } = render({ isNewQuery: true });

  const removeLink = queryByText(text.deleteQuery);

  expect(removeLink).toBeNull();
=======
test('calls "onShareQuery" handler', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  const shareQuery = getByText(text.shareQuery);
  fireEvent.click(shareQuery);

  expect(props.onShareQuery).toHaveBeenCalled();
});

test('allows user to share query url', () => {
  const {
    wrapper: { getByText },
    store,
  } = render();

  const shareQuery = getByText(text.shareQuery);
  fireEvent.click(shareQuery);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "type": "@app/SHARE_QUERY_URL",
      },
    ]
  `);
>>>>>>> feat: 🎸 share query url feature
});
