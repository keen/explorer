/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import { SettingsModalSource } from '../../modules/app';

import { ERRORS } from '../../constants';

import QuerySettings from './QuerySettings';

const render = (storeState: any = {}, overProps: any = {}) => {
  const mockStore = configureStore([]);
  const state = {
    queries: {
      isSaving: false,
      cachedQueries: {
        LimitReached: false,
      },
      savedQueries: [],
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

  const button = getByText('query_settings.save_query_button');
  fireEvent.click(button);

  expect(props.onSave).toHaveBeenCalledWith({
    displayName: 'Last month purchases',
    name: 'Last-month-purchases',
    refreshRate: 0,
    tags: [],
  });
});

test('do not renders resource name for non existing saved query', () => {
  const {
    wrapper: { queryByTestId },
  } = render();

  expect(queryByTestId('resource-name')).not.toBeInTheDocument();
});

test('allows user to change name for existing saved query', () => {
  const storeState = {
    savedQuery: {
      name: 'purchases',
      displayName: 'Purchases',
      cached: false,
      refreshRate: 0,
      exists: true,
      tags: [],
    },
  };

  const {
    wrapper: { getByTestId, getByText },
    props,
  } = render(storeState);

  const input = getByTestId('query-name-input');
  fireEvent.change(input, { target: { value: 'Last month purchases' } });

  const button = getByText('query_settings.save_query_button');
  fireEvent.click(button);

  expect(props.onSave).toHaveBeenCalledWith({
    displayName: 'Last month purchases',
    name: 'purchases',
    refreshRate: 0,
    tags: [],
  });
});

test('allows user to close query settings', () => {
  const {
    props,
    wrapper: { getByText },
  } = render();

  const button = getByText('query_settings.close_button');
  fireEvent.click(button);

  expect(props.onClose).toHaveBeenCalled();
});

test('renders query uniqueness name error', () => {
  const storeState = {
    queries: {
      isSaving: false,
      cachedQueries: {
        LimitReached: false,
      },
      savedQueries: [{ name: 'revenue' }],
      saveQueryError: null,
    },
  };
  const {
    wrapper: { getByText, getByTestId },
  } = render(storeState);

  const input = getByTestId('query-name-input');
  fireEvent.change(input, { target: { value: 'revenue' } });

  const button = getByText('query_settings.save_query_button');
  fireEvent.click(button);

  expect(
    getByText('query_settings.query_unique_name_error')
  ).toBeInTheDocument();
});

test('renders query name error', () => {
  const {
    wrapper: { getByText },
  } = render();

  const button = getByText('query_settings.save_query_button');
  fireEvent.click(button);

  expect(getByText('query_settings.query_name_error')).toBeInTheDocument();
});

test('renders notice about naming save query', () => {
  const {
    wrapper: { getByText },
  } = render();

  expect(getByText('query_settings.new_query_notice')).toBeInTheDocument();
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
  const queryNotice = screen.queryByText('query_settings.new_query_notice');

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

test('renders "Upgrade plan" anchor for cached queries limit error', () => {
  const storeState = {
    queries: {
      isSaving: false,
      cachedQueries: {
        limitReached: true,
        limit: 5,
      },
      saveQueryError: {
        error_code: ERRORS.TOO_MANY_QUERIES,
      },
    },
  };
  const {
    wrapper: { getByText },
  } = render(storeState);

  expect(getByText('query_settings.upgrade_anchor')).toBeInTheDocument();
});
