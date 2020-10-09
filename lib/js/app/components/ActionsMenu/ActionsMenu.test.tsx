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
    onHideMenu: jest.fn(),
    ...overProps,
  };

  const mockStore = configureStore([]);
  const store = mockStore({ queries: {} });

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

test("doesn't allow to remove new query", () => {
  const {
    wrapper: { queryByText },
  } = render({ isNewQuery: true });

  const removeLink = queryByText(text.deleteQuery);

  expect(removeLink).toBeNull();
});

test('calls "onHideMenu" handler', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  const shareQuery = getByText(text.shareQuery);
  fireEvent.click(shareQuery);

  expect(props.onHideMenu).toHaveBeenCalled();
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
});

test('allows user to export results as image', () => {
  const {
    wrapper: { getByText },
    store,
  } = render();

  const exportImage = getByText(text.image);
  fireEvent.click(exportImage);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "type": "@app/EXPORT_CHART_TO_IMAGE",
      },
    ]
  `);
});

test('allows user to export results as JSON', () => {
  const {
    wrapper: { getByText },
    store,
  } = render();

  const exportJson = getByText(text.json);
  fireEvent.click(exportJson);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "type": "@app/EXPORT_CHART_TO_JSON",
      },
    ]
  `);
});

test('allows user to export results as CSV', () => {
  const {
    wrapper: { getByText },
    store,
  } = render();

  const exportCsv = getByText(text.csv);
  fireEvent.click(exportCsv);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "type": "@app/EXPORT_DATA_TO_CSV",
      },
    ]
  `);
});

test('allows user to embed HTML code', () => {
  const {
    wrapper: { getByText },
    store,
  } = render();

  const embedHtml = getByText(text.embedHtml);
  fireEvent.click(embedHtml);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "type": "@app/SHOW_EMBED_MODAL",
      },
    ]
  `);
});
