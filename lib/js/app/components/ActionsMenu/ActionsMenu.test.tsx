import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import { AppContext } from '../../contexts';

import ActionsMenu from './ActionsMenu';

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
    <AppContext.Provider value={{ keenAnalysis: { config: {} } } as any}>
      <Provider store={store}>
        <ActionsMenu {...props} />
      </Provider>
    </AppContext.Provider>
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

  const removeLink = getByText('actions_menu.delete_query');
  fireEvent.click(removeLink);

  expect(props.onRemoveQuery).toHaveBeenCalled();
});

test("doesn't allow to remove new query", () => {
  const {
    wrapper: { queryByText },
  } = render({ isNewQuery: true });

  const removeLink = queryByText('actions_menu.delete_query');

  expect(removeLink).toBeNull();
});

test('calls "onHideMenu" handler', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  const shareQuery = getByText('actions_menu.share_query');
  fireEvent.click(shareQuery);

  expect(props.onHideMenu).toHaveBeenCalled();
});

test('allows user to share query url', () => {
  const {
    wrapper: { getByText },
    store,
  } = render();

  const shareQuery = getByText('actions_menu.share_query');
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

  const exportImage = getByText('actions_menu.image');
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

  const exportJson = getByText('actions_menu.json');
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

  const exportCsv = getByText('actions_menu.csv');
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

  const embedHtml = getByText('actions_menu.embed_html');
  fireEvent.click(embedHtml);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "type": "@app/SHOW_EMBED_MODAL",
      },
    ]
  `);
});

test('allows user to copy API Resource', () => {
  const {
    wrapper: { getByText },
    store,
  } = render();

  const copyApiResource = getByText('actions_menu.api_resource');
  fireEvent.click(copyApiResource);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "config": Object {},
        },
        "type": "@app/COPY_API_RESOURCE_URL",
      },
    ]
  `);
});

test('allows user to clone query', () => {
  const {
    wrapper: { getByText },
    store,
  } = render();

  const cloneQuery = getByText(text.cloneQuery);
  fireEvent.click(cloneQuery);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "type": "@queries/CLONE_SAVED_QUERY",
      },
    ]
  `);
});
