import React from 'react';
import { Provider } from 'react-redux';
import {
  render as rtlRender,
  fireEvent,
  screen,
  cleanup,
} from '@testing-library/react';
import configureStore from 'redux-mock-store';

import { AppContext } from '../../contexts';

import EmbedWidgetModal from './EmbedWidgetModal';

const render = (storeState: any = {}) => {
  const mockStore = configureStore([]);
  const initialState = {
    app: {
      embedModal: {
        visible: true,
      },
      visualization: {
        type: 'table',
      },
    },
    queries: {},
    ...storeState,
  };
  const store = mockStore({ ...initialState });

  const context = {
    datavizSettings: {
      theme: {
        gridX: { enabled: true },
        gridY: { enabled: true },
      },
    },
    modalContainer: '#modal-root',
    keenAnalysis: {
      config: { projectId: 'projectId', readKey: 'readKey' },
    },
  };

  const wrapper = rtlRender(
    <AppContext.Provider value={context as any}>
      <Provider store={store}>
        <EmbedWidgetModal />
      </Provider>
    </AppContext.Provider>
  );

  return {
    store,
    wrapper,
  };
};

beforeEach(() => {
  let modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  }
});

afterEach(() => {
  cleanup();
});

test('shows modal with Download HTML button', () => {
  const {
    wrapper: { getByText },
  } = render();
  const button = getByText('embed_widget.download_file_button');

  expect(button).toBeInTheDocument();
});

test('allows user to copy HTML code to clipboard', () => {
  const { store } = render();
  const copyCode = screen.getByText('embed_widget.copy_code_button');

  fireEvent.click(copyCode);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "projectId": "projectId",
          "readKey": "readKey",
        },
        "type": "@app/COPY_EMBEDDED_CODE",
      },
    ]
  `);
});

test('allows user to download HTML file', () => {
  const { store } = render();
  const downloadFile = screen.getByText('embed_widget.download_file_button');

  fireEvent.click(downloadFile);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "projectId": "projectId",
          "readKey": "readKey",
        },
        "type": "@app/DOWNLOAD_CODE_SNIPPET",
      },
    ]
  `);
});

test('allows user to close modal by clicking "cancel" label', () => {
  const { store } = render();
  const close = screen.getByText('embed_widget.close_button');

  fireEvent.click(close);

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": undefined,
        "type": "@app/HIDE_EMBED_MODAL",
      },
    ]
  `);
});
