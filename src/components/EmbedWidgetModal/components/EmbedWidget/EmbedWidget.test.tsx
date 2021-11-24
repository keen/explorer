import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import { fireEvent, screen, render as rtlRender } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import { AppContext } from '../../../../contexts';
import EmbedWidget from './EmbedWidget';

mockAllIsIntersecting(true);

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
        <EmbedWidget />
      </Provider>
    </AppContext.Provider>
  );

  return {
    store,
    wrapper,
  };
};

test('shows Download HTML button', () => {
  const {
    wrapper: { getByText },
  } = render();

  const button = getByText('embed_widget.download_file_button');

  expect(button).toBeInTheDocument();
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
        "type": "app/downloadCodeSnippet",
      },
    ]
  `);
});
