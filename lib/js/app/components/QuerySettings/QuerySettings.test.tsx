import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import QuerySettings from './QuerySettings';
import text from './text.json';

const render = (storeState: any = {}, overProps: any = {}) => {
  const mockStore = configureStore([]);
  const state = {
    queries: {
      isSaving: false,
      saveQueryError: null,
    },
    savedQuery: {
      name: '',
      displayName: '',
      cached: false,
      refreshRate: 0,
      exists: false,
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

test('renders save query error', () => {
  const storeState = {
    queries: {
      isSaving: false,
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
