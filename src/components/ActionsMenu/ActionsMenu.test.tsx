import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import { AppContext } from '../../contexts';

import ActionsMenu from './ActionsMenu';

const render = (overProps: any = {}, overStore: any = {}) => {
  const props = {
    isNewQuery: false,
    isInsideQueryBrowser: false,
    onRemoveQuery: jest.fn(),
    onHideMenu: jest.fn(),
    ...overProps,
  };

  const mockStore = configureStore([]);
  const store = mockStore({
    queries: {},
    ...overStore,
  });

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

describe('Scenario 1 - Query is editable', () => {
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
          "payload": Object {
            "backgroundColor": "#FFFFFF",
            "quality": 90,
          },
          "type": "dataExport/exportChartToImage",
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
          "payload": undefined,
          "type": "dataExport/exportChartToJson",
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
          "payload": true,
          "type": "dataExport/showCSVExportModal",
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
              "payload": undefined,
              "type": "app/showEmbedModal",
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
              "type": "app/copyApiResourceUrl",
            },
          ]
      `);
  });

  test('allows user to clone query', () => {
    const {
      wrapper: { getByText },
      store,
    } = render();

    const cloneQuery = getByText('actions_menu.clone_query');
    fireEvent.click(cloneQuery);

    expect(store.getActions()).toMatchInlineSnapshot(`
          Array [
            Object {
              "payload": undefined,
              "type": "queries/cloneSavedQuery",
            },
          ]
      `);
  });

  test('allows user to create new query', () => {
    const {
      wrapper: { getByText },
      store,
    } = render();

    const newQuery = getByText('actions_menu.new_query');
    fireEvent.click(newQuery);

    expect(store.getActions()).toMatchInlineSnapshot(`
          Array [
            Object {
              "payload": undefined,
              "type": "app/createNewQuery",
            },
          ]
      `);
  });

  test("doesn't allow user to create new query inside query browser", () => {
    const {
      wrapper: { queryByText },
    } = render({ isInsideQueryBrowser: true });

    const newQuery = queryByText('actions_menu.new_query');

    expect(newQuery).toBeNull();
  });
});

describe('Scenario 2 - Query is not editable', () => {
  const overProps = {
    isQueryEditable: false,
  };
  test('shows ActionsMenu', () => {
    const {
      wrapper: { container },
    } = render(overProps);
    expect(container).toBeInTheDocument();
  });

  test('allows user to remove query', () => {
    const {
      wrapper: { getByText },
      props,
    } = render(overProps);
    const removeLink = getByText('actions_menu.delete_query');
    fireEvent.click(removeLink);
    expect(props.onRemoveQuery).toHaveBeenCalled();
  });

  test('clone query menu item is not visible', () => {
    const {
      wrapper: { queryByText },
    } = render(overProps);
    const cloneQuery = queryByText('actions_menu.clone_query');
    expect(cloneQuery).toBeNull();
  });

  test('copy resource url menu item not exists', () => {
    const {
      wrapper: { queryByText },
    } = render(overProps);
    const cloneQuery = queryByText('actions_menu.api_resource');
    expect(cloneQuery).toBeNull();
  });
});
