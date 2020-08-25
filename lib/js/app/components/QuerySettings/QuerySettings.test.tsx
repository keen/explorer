import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import { SettingsModalSource } from '../../modules/app';

import QuerySettings from './QuerySettings';
import text from './text.json';

const render = (storeState: any = {}, overProps: any = {}) => {
  const mockStore = configureStore([]);
  const state = {
    queries: {
      isSaving: false,
      cachedQueries: {
        LimitReached: false,
      },
      saveQueryError: null,
    },
    project: {
      tagsPool: [],
    },
    app: {
      querySettingsModal: {
        source: SettingsModalSource.FIRST_QUERY_SAVE,
      },
    },
    savedQuery: {
      name: '',
      displayName: '',
      cached: false,
      refreshRate: 0,
      exists: false,
      tags: [],
    },
    ...storeState,
  };

  const store = mockStore({ ...state });

  const props = {
    onSave: jest.fn(),
    onClose: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(
    <Provider store={store}>
      <QuerySettings {...props} />
    </Provider>
  );

  return {
    store,
    props,
    wrapper,
  };
};

test('allows user to save query', () => {
  const {
    wrapper: { getByTestId, getByText },
    props,
  } = render();

  const input = getByTestId('query-name-input');
  fireEvent.change(input, { target: { value: 'Last month purchases' } });

  const button = getByText(text.saveButton);
  fireEvent.click(button);

  expect(props.onSave).toHaveBeenCalledWith({
    displayName: 'Last month purchases',
    name: 'last-month-purchases',
    refreshRate: 0,
    tags: [],
  });
});

test('allows user to close query settings', () => {
  const {
    props,
    wrapper: { getByText },
  } = render();

  const button = getByText(text.closeButton);
  fireEvent.click(button);

  expect(props.onClose).toHaveBeenCalled();
});

test('renders query name error', () => {
  const {
    wrapper: { getByText },
  } = render();

  const button = getByText(text.saveButton);
  fireEvent.click(button);

  expect(getByText(text.queryNameError)).toBeInTheDocument();
});

test('renders notice about naming save query', () => {
  const {
    wrapper: { getByText },
  } = render();

  expect(getByText(text.newQueryNotice)).toBeInTheDocument();
});

test('do not renders notice about naming save query', () => {
  const storeState = {
    app: {
      querySettingsModal: {
        source: SettingsModalSource.QUERY_SETTINGS,
      },
    },
  };
  render(storeState);
  const queryNotice = screen.queryByText(text.newQueryNotice);

  expect(queryNotice).toBeNull();
});

test('renders save query error', () => {
  const storeState = {
    queries: {
      isSaving: false,
      cachedQueries: {
        limitReached: true,
        limit: 5,
      },
      saveQueryError: {
        body: 'save query error',
      },
    },
  };
  const {
    wrapper: { getByTestId },
  } = render(storeState);

  expect(getByTestId('error-alert')).toBeInTheDocument();
});
