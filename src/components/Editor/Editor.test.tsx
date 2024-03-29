/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render as rtlRender, fireEvent } from '@testing-library/react';

jest.mock('@keen.io/query-creator');
import { MENU_ITEMS_ENUM } from '@keen.io/widget-customization';

import { AppContext } from '../../contexts';
import { EditorSection } from '../../modules/editor';

import Editor from './Editor';

const render = (storeState: any = {}, overProps: any = {}) => {
  const mockStore = configureStore([]);
  const state = {
    savedQuery: {
      name: '',
      displayName: '',
      cached: false,
      refreshRate: 0,
      exists: false,
      tags: [],
    },
    app: {
      visualization: {
        type: null,
        chartSettings: {},
        widgetSettings: {},
      },
      querySettingsModal: {
        visible: false,
      },
    },
    queries: {
      results: null,
      isLoading: false,
      queriesExecution: {
        limitReached: false,
      },
      extractionConfirmation: {
        isVisible: false,
      },
    },
    editor: {
      activeEditorTab: EditorSection.QUERY,
      activeSettingsSection: MENU_ITEMS_ENUM.TITLES,
    },
    ...storeState,
  };

  const store = mockStore({ ...state });

  const props = {
    query: {},
    onUpdateQuery: jest.fn(),
    onRunQuery: jest.fn(),
    onSaveQuery: jest.fn(),
    ...overProps,
  };
  const context = {
    datavizSettings: {
      theme: {
        gridX: { enabled: true },
        gridY: { enabled: true },
        funnel: {
          header: {
            badge: {
              enabled: true,
            },
          },
        },
      },
    },
    keenAnalysis: {
      config: {},
    },
  };
  const wrapper = rtlRender(
    <AppContext.Provider value={context as any}>
      <Provider store={store}>
        <Editor {...props} />
      </Provider>
    </AppContext.Provider>
  );

  return {
    store,
    props,
    wrapper,
  };
};

test('allows user to reset query settings', () => {
  const {
    wrapper: { getByText },
    store,
  } = render();

  const clearButton = getByText('editor.clear_query_button');
  fireEvent.click(clearButton);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": undefined,
        "type": "savedQuery/resetConnectedDashboards",
      },
      Object {
        "payload": undefined,
        "type": "app/queryEditorMounted",
      },
      Object {
        "payload": undefined,
        "type": "app/clearQuery",
      },
    ]
  `);
});

test('allows user to run query', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  const clearButton = getByText('editor.run_query_button');
  fireEvent.click(clearButton);

  expect(props.onRunQuery).toHaveBeenCalled();
});

test('allows user to customize widget title', () => {
  const storeState = {
    app: {
      visualization: {
        type: 'table',
        chartSettings: {},
        widgetSettings: {},
      },
      querySettingsModal: {
        visible: false,
      },
    },
    editor: {
      activeEditorTab: EditorSection.SETTINGS,
      activeSettingsSection: MENU_ITEMS_ENUM.TITLES,
    },
  };

  const {
    wrapper: { queryByText, getByPlaceholderText },
    store,
  } = render(storeState);

  const settingsTab = queryByText('editor.settings_section');
  fireEvent.click(settingsTab);

  store.clearActions();

  const input = getByPlaceholderText(
    'widget_customization_heading_settings.title_placeholder'
  );
  fireEvent.change(input, { target: { value: '@title' } });

  expect(store.getActions()).toMatchSnapshot();
});

test('allows user to customize widget subtitle', () => {
  const storeState = {
    app: {
      visualization: {
        type: 'area',
        chartSettings: {},
        widgetSettings: {},
      },
      querySettingsModal: {
        visible: false,
      },
    },
    editor: {
      activeEditorTab: EditorSection.SETTINGS,
      activeSettingsSection: MENU_ITEMS_ENUM.TITLES,
    },
  };

  const {
    wrapper: { queryByText, getByPlaceholderText },
    store,
  } = render(storeState);

  const settingsTab = queryByText('editor.settings_section');
  fireEvent.click(settingsTab);

  store.clearActions();

  const input = getByPlaceholderText(
    'widget_customization_heading_settings.subtitle_placeholder'
  );
  fireEvent.change(input, { target: { value: '@subtitle' } });

  expect(store.getActions()).toMatchSnapshot();
});

test('do not renders email extraction button', () => {
  const {
    wrapper: { queryByText },
  } = render();

  expect(queryByText('editor.extract_to_email_button')).not.toBeInTheDocument();
});

test('allows user to perform extraction to email', () => {
  const overProps = {
    query: {
      analysis_type: 'extraction',
    },
  };

  const {
    wrapper: { getByText },
    store,
  } = render({}, overProps);

  const button = getByText('editor.extract_to_email_button');
  fireEvent.click(button);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": undefined,
        "type": "savedQuery/resetConnectedDashboards",
      },
      Object {
        "payload": undefined,
        "type": "app/queryEditorMounted",
      },
      Object {
        "payload": undefined,
        "type": "queries/extractToEmail",
      },
    ]
  `);
});

test('renders notice about queries execution limit exceed', () => {
  const storeState = {
    queries: {
      results: null,
      isLoading: false,
      queriesExecution: {
        limitReached: true,
      },
      extractionConfirmation: {
        isVisible: false,
      },
    },
  };

  const {
    wrapper: { getByTestId },
  } = render(storeState);

  expect(getByTestId('query-execution-limit')).toBeInTheDocument();
});
